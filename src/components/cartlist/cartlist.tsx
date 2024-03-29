import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { distance, numberFormat } from "../../utils/transactions";

const Cart = ({
  paymentStep,
  promoStep,
  formStep,
}: {
  paymentStep: () => void;
  promoStep: () => void;
  formStep: number;
}) => {
  const router = useRouter();
  const { index } = router.query;
  const [count, setCount] = useState(0);
  const [pembayaranTunai, setPembayaranTunai] = useState(true);
  function handleIncrement() {
    setCount(count + 1);
  }
  function handleDecrement() {
    setCount(count - 1);
  }

  const getData = api.transaction.getCart.useQuery({
    mitraId: index as string,
  });

  const lng_lat = getData.data?.user.Alamat[0]?.alamat.split(",");
  const lng_latMerchant = getData.data?.merchant.alamat.split(",");

  const [location, setLocation] = useState("");
  const [estimated, setEstimated] = useState({
    time: 0,
    distance: 0,
    biaya: 0,
  });

  useEffect(() => {
    fetch(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${lng_lat![1]!}%2C${lng_lat![0]!}`
    )
      .then((res) => res.json())
      .then((data: { address: { Match_addr: string } }) =>
        setLocation(data.address.Match_addr)
      )
      .catch((e) => console.log(e));

    const distance = estimatedTime();
    setEstimated({
      time: parseFloat(distance.time),
      distance: parseFloat(distance.distance),
      biaya: parseFloat(distance.distance) * 5000,
    });
  }, []);

  const estimatedTime = () => {
    const x = distance({
      lat1: parseFloat(lng_lat![1]!),
      lon1: parseFloat(lng_lat![0]!),
      lat2: parseFloat(lng_latMerchant![1]!),
      lon2: parseFloat(lng_latMerchant![0]!),
      unit: "K",
    });
    const speed = 30;
    const time = (x / speed) * 60;
    return { time: time.toFixed(2), distance: x.toFixed(2) };
  };

  const biayaLayanan = 4000;

  const createOrder = api.transaction.createOrder.useMutation();
  const total =
    getData.data?.CartMenu.reduce((acc, curr) => {
      return acc + (curr.qty * curr.Menu.harga || 0);
    }, 0) || 0;

  const bayar = async () => {
    const data = await createOrder.mutateAsync({
      cartId: getData.data?.id as string,
      MetodePembayaran: pembayaranTunai ? "CASH" : "WALLET",
      mitraId: index as string,
      total: total + estimated.biaya + biayaLayanan,
    });

    if (data) {
      await router.push(`/order/${data.id}`);
    }
  };

  const handlePayment = () => {
    if (pembayaranTunai) {
      if (
        (getData.data?.user.saldo || 0) <
        total + estimated.biaya + biayaLayanan
      ) {
        alert("Saldo anda tidak cukup");
      } else {
        setPembayaranTunai((val) => !val);
      }
    } else {
      setPembayaranTunai((val) => !val);
    }
  };
  return (
    <div hidden={formStep != 0}>
      <div className="relative h-full w-full overflow-hidden bg-[#212121]">
        <div className="flex flex-row items-center gap-x-4 pt-16 pl-12 pb-8">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scale-[150%] hover:cursor-pointer"
            onClick={() => router.push("search")}
          >
            <path
              d="M6.87502 15.3001L0.275016 8.70006C0.175016 8.60006 0.104015 8.49173 0.0620154 8.37506C0.0200154 8.25839 -0.000651042 8.13339 1.56251e-05 8.00006C1.56251e-05 7.86673 0.0210158 7.74173 0.0630158 7.62506C0.105016 7.50839 0.175682 7.40006 0.275016 7.30006L6.87502 0.70006C7.05835 0.516727 7.28768 0.421061 7.56302 0.413061C7.83835 0.405061 8.07568 0.500727 8.27501 0.70006C8.47501 0.883394 8.57935 1.11273 8.58802 1.38806C8.59668 1.66339 8.50068 1.90073 8.30002 2.10006L3.40002 7.00006H14.575C14.8583 7.00006 15.096 7.09606 15.288 7.28806C15.48 7.48006 15.5757 7.71739 15.575 8.00006C15.575 8.28339 15.4793 8.52106 15.288 8.71306C15.0967 8.90506 14.859 9.00073 14.575 9.00006H3.40002L8.30002 13.9001C8.48335 14.0834 8.57935 14.3167 8.58802 14.6001C8.59668 14.8834 8.50068 15.1167 8.30002 15.3001C8.11668 15.5001 7.88335 15.6001 7.60002 15.6001C7.31668 15.6001 7.07502 15.5001 6.87502 15.3001Z"
              fill="#EFEFEF"
            />
          </svg>

          <p className="font-literata text-xl text-white">Konfirmasi Pesanan</p>
        </div>
      </div>
      <div className="bg-secondary-500 pb-56">
        <div className="p-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-x-3">
              <svg
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="scale-[150%]"
              >
                <path
                  d="M5.2 6.5C5.5575 6.5 5.86365 6.3726 6.11845 6.1178C6.37325 5.863 6.50043 5.55707 6.5 5.2C6.5 4.8425 6.3726 4.53635 6.1178 4.28155C5.863 4.02675 5.55707 3.89957 5.2 3.9C4.8425 3.9 4.53635 4.0274 4.28155 4.2822C4.02675 4.537 3.89957 4.84293 3.9 5.2C3.9 5.5575 4.0274 5.86365 4.2822 6.11845C4.537 6.37325 4.84293 6.50043 5.2 6.5ZM5.2 13C3.45583 11.5158 2.15323 10.1374 1.2922 8.8647C0.431167 7.592 0.000433333 6.41377 0 5.33C0 3.705 0.522817 2.41042 1.56845 1.44625C2.61408 0.482083 3.8246 0 5.2 0C6.57583 0 7.78656 0.482083 8.8322 1.44625C9.87783 2.41042 10.4004 3.705 10.4 5.33C10.4 6.41333 9.96927 7.59157 9.1078 8.8647C8.24633 10.1378 6.94373 11.5163 5.2 13Z"
                  fill="#F6C73B"
                />
              </svg>
              <p className="font-louis font-light text-primary-300">
                Alamat Pengiriman
              </p>
            </div>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.45809 0.249045L4.76166 3.55262L8.06523 0.249045C8.39729 -0.0830151 8.9337 -0.0830151 9.26576 0.249045C9.59782 0.581106 9.59782 1.11751 9.26576 1.44957L5.35767 5.35767C5.02561 5.68973 4.4892 5.68973 4.15714 5.35767L0.249045 1.44957C-0.0830151 1.11751 -0.0830151 0.581106 0.249045 0.249045C0.581106 -0.0745007 1.12603 -0.0830151 1.45809 0.249045Z"
                fill="#F6C73B"
              />
            </svg>
          </div>
          <p className="pl-6 font-louis font-light text-white">{location}</p>
          <div className="flex flex-row items-center gap-x-3 pt-2">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-[150%]"
            >
              <path
                d="M6.5 0C5.21442 0 3.95771 0.381218 2.8888 1.09545C1.81988 1.80968 0.986755 2.82484 0.494786 4.01256C0.00281632 5.20028 -0.125905 6.50721 0.124899 7.76809C0.375702 9.02896 0.994767 10.1872 1.90381 11.0962C2.81285 12.0052 3.97104 12.6243 5.23191 12.8751C6.49279 13.1259 7.79972 12.9972 8.98744 12.5052C10.1752 12.0132 11.1903 11.1801 11.9046 10.1112C12.6188 9.04229 13 7.78558 13 6.5C13 5.64641 12.8319 4.80117 12.5052 4.01256C12.1786 3.22394 11.6998 2.50739 11.0962 1.90381C10.4926 1.30022 9.77606 0.821438 8.98744 0.494783C8.19883 0.168127 7.35359 0 6.5 0ZM9.1 7.15H6.5C6.32761 7.15 6.16228 7.08152 6.04038 6.95962C5.91848 6.83772 5.85 6.67239 5.85 6.5V3.9C5.85 3.72761 5.91848 3.56228 6.04038 3.44038C6.16228 3.31848 6.32761 3.25 6.5 3.25C6.67239 3.25 6.83772 3.31848 6.95962 3.44038C7.08152 3.56228 7.15 3.72761 7.15 3.9V5.85H9.1C9.27239 5.85 9.43772 5.91848 9.55962 6.04038C9.68152 6.16228 9.75 6.32761 9.75 6.5C9.75 6.67239 9.68152 6.83772 9.55962 6.95962C9.43772 7.08152 9.27239 7.15 9.1 7.15Z"
                fill="#F6C73B"
              />
            </svg>
            <p className="font-louis font-light text-white">
              {estimated.time} menit ({estimated.distance} km)
            </p>
          </div>
        </div>
        <div className="h-full w-full border-b-2 border-t-2 border-primary-300">
          <div className="p-8">
            <div className="flex flex-row items-center gap-x-3 pb-8">
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="scale-150"
              >
                <path
                  d="M0.722222 1.44444V0H12.2778V1.44444H0.722222ZM0.722222 11.5556V7.22222H0V5.77778L0.722222 2.16667H12.2778L13 5.77778V7.22222H12.2778V11.5556H10.8333V7.22222H7.94444V11.5556H0.722222ZM2.16667 10.1111H6.5V7.22222H2.16667V10.1111Z"
                  fill="#F6C73B"
                />
              </svg>
              <p className="font-literata text-white">
                {getData.data?.merchant.nama}
              </p>
            </div>
            {getData.data?.CartMenu.map((item, i) => (
              <CartItem
                key={item.Menu.id}
                count={item.qty}
                name={item.Menu.nama}
                price={item.Menu.harga}
                image={item.Menu.gambar}
                merchantId={index as string}
                id={item.Menu.id}
                last={
                  i == (getData.data?.CartMenu.length ?? 0) - 1 ? true : false
                }
              />
            ))}
          </div>
        </div>
        <div className="mx-5 mt-8 flex flex-row items-center justify-between rounded-xl border-2 border-primary-300 p-5">
          <div className="flex flex-row gap-x-5">
            <svg
              width="25"
              height="23"
              viewBox="0 0 25 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-150"
            >
              <path
                d="M20.5951 4.71082L18.5681 1.19991C18.2993 0.734335 17.8565 0.394608 17.3373 0.255467C16.818 0.116325 16.2647 0.189167 15.7991 0.457968L1.75546 8.56608C1.28988 8.83488 0.950154 9.27762 0.811012 9.7969C0.671871 10.3162 0.744713 10.8695 1.01351 11.335L3.04054 14.846C3.50612 14.5772 4.0594 14.5043 4.57869 14.6435C5.09797 14.7826 5.54071 15.1223 5.80951 15.5879C6.07831 16.0535 6.15115 16.6068 6.01201 17.126C5.87287 17.6453 5.53314 18.0881 5.06757 18.3569L7.09459 21.8678C7.65203 22.8333 8.89806 23.1672 9.86356 22.6097L23.9072 14.5016C24.8727 13.9442 25.2066 12.6982 24.6492 11.7327L22.6221 8.22174C21.6566 8.77917 20.4106 8.4453 19.8532 7.47979C19.2957 6.51429 19.6296 5.26826 20.5951 4.71082ZM18.0998 4.44285C17.405 5.65153 17.3528 7.20305 18.0977 8.49331C18.8426 9.78357 20.2124 10.5141 21.6065 10.5167L22.8937 12.7462L8.85005 20.8543L7.56289 18.6248C8.25772 17.4162 8.3099 15.8647 7.56497 14.5744C6.80483 13.2578 5.45907 12.5485 4.05613 12.551L2.76897 10.3215L16.8126 2.21342L18.0998 4.44285ZM13.4739 14.6738L15.2293 13.6603L16.2429 15.4157L14.4874 16.4292M11.4469 11.1629L13.2023 10.1494L14.2158 11.9048L12.4604 12.9183M9.41983 7.65196L11.1753 6.63845L12.1888 8.39391L10.4333 9.40742L9.41983 7.65196Z"
                fill="#EFEFEF"
              />
            </svg>

            <h1 className=" font-louis text-xl font-light text-white">Promo</h1>
          </div>

          <svg
            width={28}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180 hover:cursor-pointer"
            onClick={() => promoStep()}
          >
            <rect
              width={28}
              height={28}
              rx={14}
              transform="matrix(-1 0 0 1 28 0)"
              fill="#F6C73B"
            />
            <path
              d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
              fill="#1D1D1D"
            />
          </svg>
        </div>
        <div className="mx-5 mt-4 flex flex-row items-center justify-between rounded-xl border-2 border-primary-300 p-5">
          <div className="flex flex-row gap-x-5">
            <svg
              width="25"
              height="23"
              viewBox="0 0 25 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-150"
            >
              <path
                d="M16.0884 0.290688L1.46591 8.733C0.65524 9.20104 0.378303 10.2346 0.844583 11.0422L7.03819 21.7699C7.50448 22.5775 8.53802 22.8544 9.34869 22.3864L23.9712 13.9441C24.7819 13.476 25.0588 12.4425 24.5925 11.6349L18.3989 0.907207C17.9326 0.0995854 16.8991 -0.177352 16.0884 0.290688ZM2.49335 10.0903L16.7502 1.85912C16.8507 1.80106 16.9805 1.83583 17.0386 1.93641L17.7776 3.21641L3.15508 11.6587L2.41607 10.3787C2.358 10.2782 2.39278 10.1484 2.49335 10.0903ZM22.9438 12.5868L8.68696 20.8179C8.58639 20.876 8.4566 20.8412 8.39853 20.7407L5.4073 15.5597L20.0298 7.11737L23.021 12.2983C23.0791 12.3989 23.0443 12.5287 22.9438 12.5868ZM11.1301 15.3439L11.8339 16.5629C11.95 16.7641 11.8805 17.0237 11.6793 17.1398L9.48505 18.4067C9.28391 18.5228 9.02432 18.4533 8.90819 18.2521L8.20437 17.0331C8.08824 16.8319 8.15779 16.5723 8.35894 16.4562L10.5532 15.1893C10.7544 15.0732 11.014 15.1428 11.1301 15.3439ZM16.9815 11.9656L17.6854 13.1846C17.8015 13.3858 17.7319 13.6453 17.5308 13.7615L13.386 16.1545C13.1849 16.2706 12.9253 16.201 12.8092 15.9999L12.1053 14.7808C11.9892 14.5797 12.0588 14.3201 12.2599 14.204L16.4047 11.811C16.6058 11.6949 16.8654 11.7644 16.9815 11.9656Z"
                fill="#EFEFEF"
              />
            </svg>

            <h1 className=" font-louis text-xl font-light text-white">
              Metode Pembayaran
            </h1>
          </div>

          <h1
            className=" cursor-pointer font-louis text-xl font-light text-white"
            onClick={() => handlePayment()}
          >
            {pembayaranTunai ? "Tunai" : "Wallet"} &gt;
          </h1>
        </div>
        <div className="mx-5 mt-4 items-center justify-between rounded-xl border-2 border-primary-300 p-5">
          <h1 className=" mb-4 font-literata text-xl font-light text-white">
            Rincian Pembayaran
          </h1>
          <div className="mb-4 flex flex-row justify-between gap-x-5 text-lg">
            <h1 className=" font-literata font-light text-white">
              Harga ({getData.data?.CartMenu.length} menu)
            </h1>

            <h1 className=" font-literata font-light text-white">
              {numberFormat(total)}
            </h1>
          </div>
          <div className="mb-4 flex flex-row justify-between gap-x-5 text-lg">
            <h1 className=" font-literata font-light text-white">
              Biaya Pengiriman
            </h1>

            <h1 className=" font-literata font-light text-white">
              {numberFormat(estimated.biaya)}
            </h1>
          </div>
          <div className="mb-4 flex flex-row justify-between gap-x-5 text-lg">
            <h1 className=" font-literata font-light text-white">
              Biaya Layanan
            </h1>

            <h1 className=" font-literata font-light text-white">
              {numberFormat(biayaLayanan)}
            </h1>
          </div>
          <hr className="border-1 h-1 border-primary-300 py-4" />
          <div className="mb-4 flex flex-row justify-between gap-x-5 text-lg">
            <h1 className=" font-literata text-xl font-light text-white">
              Total Pembayaran
            </h1>

            <h1 className=" font-literata text-xl font-light text-white">
              {numberFormat(total + estimated.biaya + biayaLayanan)}
            </h1>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-[100] h-fit w-full max-w-[500px] rounded-t-xl border-t-2 border-primary-300 bg-secondary-500">
        <div className="p-8">
          <div className="mb-4 flex w-full flex-row items-center justify-between gap-x-5 text-lg">
            <div className="flex flex-row items-center justify-between gap-x-5">
              {pembayaranTunai ? (
                <div className="flex flex-row items-center justify-between gap-x-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="scale-150"
                  >
                    <path
                      d="M19 2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3V17C0 17.2652 0.105357 17.5196 0.292893 17.7071C0.48043 17.8946 0.734784 18 1 18H19C19.2652 18 19.5196 17.8946 19.7071 17.7071C19.8946 17.5196 20 17.2652 20 17V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2ZM18 13C17.2044 13 16.4413 13.3161 15.8787 13.8787C15.3161 14.4413 15 15.2044 15 16H5C5 15.2044 4.68393 14.4413 4.12132 13.8787C3.55871 13.3161 2.79565 13 2 13V7C2.79565 7 3.55871 6.68393 4.12132 6.12132C4.68393 5.55871 5 4.79565 5 4H15C15 4.79565 15.3161 5.55871 15.8787 6.12132C16.4413 6.68393 17.2044 7 18 7V13Z"
                      fill="#F6C73B"
                    />
                    <path
                      d="M10 6C7.794 6 6 7.794 6 10C6 12.206 7.794 14 10 14C12.206 14 14 12.206 14 10C14 7.794 12.206 6 10 6ZM10 12C8.897 12 8 11.103 8 10C8 8.897 8.897 8 10 8C11.103 8 12 8.897 12 10C12 11.103 11.103 12 10 12Z"
                      fill="#F6C73B"
                    />
                  </svg>

                  <div className="flex flex-col items-start justify-center">
                    <p className="font-literata text-[#EFEFEF]">Tunai</p>
                    <p className="font-louis text-[#EFEFEF]">
                      {numberFormat(total + estimated.biaya + biayaLayanan)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-between gap-x-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="scale-150"
                  >
                    <path
                      d="M18.9474 16.3333V17.3889C18.9474 17.9488 18.7256 18.4858 18.3308 18.8817C17.9359 19.2776 17.4005 19.5 16.8421 19.5H2.10526C1.54691 19.5 1.01143 19.2776 0.616617 18.8817C0.221804 18.4858 0 17.9488 0 17.3889V2.61111C0 2.05121 0.221804 1.51424 0.616617 1.11833C1.01143 0.72242 1.54691 0.5 2.10526 0.5H16.8421C17.4005 0.5 17.9359 0.72242 18.3308 1.11833C18.7256 1.51424 18.9474 2.05121 18.9474 2.61111V3.66667H9.47368C8.91533 3.66667 8.37985 3.88909 7.98504 4.285C7.59023 4.68091 7.36842 5.21788 7.36842 5.77778V14.2222C7.36842 14.7821 7.59023 15.3191 7.98504 15.715C8.37985 16.1109 8.91533 16.3333 9.47368 16.3333M9.47368 14.2222H20V5.77778H9.47368M13.6842 11.5833C13.2654 11.5833 12.8638 11.4165 12.5677 11.1196C12.2716 10.8227 12.1053 10.4199 12.1053 10C12.1053 9.58007 12.2716 9.17735 12.5677 8.88041C12.8638 8.58348 13.2654 8.41667 13.6842 8.41667C14.103 8.41667 14.5046 8.58348 14.8007 8.88041C15.0968 9.17735 15.2632 9.58007 15.2632 10C15.2632 10.4199 15.0968 10.8227 14.8007 11.1196C14.5046 11.4165 14.103 11.5833 13.6842 11.5833Z"
                      fill="#F6C73B"
                    />
                    <path
                      d="M2.32197 9.05527C2.40695 9.05527 2.47599 8.98991 2.47893 8.90825C2.47599 8.82659 2.40695 8.76123 2.32197 8.76123C2.237 8.76123 2.16794 8.82659 2.16504 8.90825C2.16793 8.98991 2.23699 9.05527 2.32197 9.05527Z"
                      fill="#212121"
                    />
                    <path
                      d="M2.32166 8.69165C2.20227 8.69165 2.10547 8.78871 2.10547 8.90843C2.10547 9.02815 2.20228 9.12522 2.32166 9.12522C2.44104 9.12522 2.53784 9.02815 2.53784 8.90843C2.53784 8.78871 2.44104 8.69165 2.32166 8.69165ZM2.32165 9.06609C2.23481 9.06609 2.16442 8.9979 2.16442 8.91374C2.16442 8.91195 2.16466 8.91021 2.16472 8.90843C2.16466 8.90666 2.16442 8.90491 2.16442 8.90312C2.16442 8.81897 2.23482 8.75077 2.32165 8.75077C2.40849 8.75077 2.47888 8.81897 2.47888 8.90312C2.47888 8.90491 2.47867 8.90666 2.47862 8.90843C2.47868 8.91021 2.47888 8.91195 2.47888 8.91374C2.47887 8.9979 2.40849 9.06609 2.32165 9.06609Z"
                      fill="#212121"
                    />
                    <path
                      d="M4.69996 11.0449L3.56401 11.7765C3.74249 11.9329 4.18718 12.1874 4.53813 11.9547C4.88907 11.722 4.76599 11.1879 4.69996 11.0449Z"
                      fill="#212121"
                      stroke="#212121"
                      stroke-width="0.234713"
                      stroke-linecap="round"
                    />
                    <path
                      d="M3.84808 8.20337C4.02335 8.20337 4.16575 8.06857 4.17181 7.90015C4.16575 7.73173 4.02335 7.59692 3.84808 7.59692C3.67283 7.59692 3.53039 7.73173 3.52441 7.90015C3.53037 8.06857 3.67281 8.20337 3.84808 8.20337Z"
                      fill="#212121"
                    />
                    <path
                      d="M3.84824 7.45288C3.602 7.45288 3.40234 7.65307 3.40234 7.9C3.40234 8.14691 3.60202 8.34711 3.84824 8.34711C4.09447 8.34711 4.29412 8.14691 4.29412 7.9C4.29412 7.65307 4.09447 7.45288 3.84824 7.45288ZM3.84822 8.22517C3.66912 8.22517 3.52393 8.08451 3.52393 7.91095C3.52393 7.90725 3.52443 7.90365 3.52455 7.9C3.52443 7.89634 3.52393 7.89272 3.52393 7.88904C3.52393 7.71548 3.66914 7.57482 3.84822 7.57482C4.02732 7.57482 4.17249 7.71548 4.17249 7.88904C4.17249 7.89272 4.17207 7.89634 4.17197 7.9C4.17209 7.90365 4.17249 7.90725 4.17249 7.91095C4.17247 8.08451 4.02732 8.22517 3.84822 8.22517Z"
                      fill="#212121"
                    />
                    <path
                      d="M2.93669 8.53655C3.04519 8.53655 3.13334 8.4531 3.1371 8.34884C3.13334 8.24458 3.04519 8.16113 2.93669 8.16113C2.8282 8.16113 2.74003 8.24458 2.73633 8.34884C2.74002 8.4531 2.82819 8.53655 2.93669 8.53655Z"
                      fill="#212121"
                    />
                    <path
                      d="M2.93716 8.07202C2.78473 8.07202 2.66113 8.19595 2.66113 8.34881C2.66113 8.50166 2.78474 8.62559 2.93716 8.62559C3.08959 8.62559 3.21318 8.50166 3.21318 8.34881C3.21318 8.19595 3.08959 8.07202 2.93716 8.07202ZM2.93715 8.55011C2.82628 8.55011 2.7364 8.46303 2.7364 8.35559C2.7364 8.3533 2.73671 8.35107 2.73679 8.34881C2.73671 8.34654 2.7364 8.3443 2.7364 8.34203C2.7364 8.23458 2.82629 8.14751 2.93715 8.14751C3.04802 8.14751 3.13789 8.23458 3.13789 8.34203C3.13789 8.3443 3.13763 8.34654 3.13757 8.34881C3.13764 8.35107 3.13789 8.3533 3.13789 8.35559C3.13788 8.46303 3.04802 8.55011 2.93715 8.55011Z"
                      fill="#212121"
                    />
                    <path
                      d="M3.32743 11.587C3.53746 10.4685 3.41369 9.83719 3.19137 9.69696L3.37019 9.63805C3.77428 10.7008 3.68804 11.2352 3.67985 11.4265C3.6363 11.6113 3.50926 11.657 3.472 11.6679C3.3444 11.7296 3.32245 11.6397 3.32743 11.587Z"
                      fill="#212121"
                      stroke="#212121"
                      stroke-width="0.117356"
                    />
                    <path
                      d="M4.454 8.98331C3.49635 9.48669 4.0842 10.4859 4.49783 10.9226C4.53031 10.9467 4.54517 10.9386 4.6395 10.8658C4.6649 10.8301 4.47618 10.5254 4.4515 10.4894C4.1216 10.0077 3.87313 9.14882 4.81032 8.94396L4.454 8.98331Z"
                      fill="#212121"
                      stroke="#212121"
                      stroke-width="0.117356"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.48704 9.11905L4.3593 8.93064C4.33236 8.87378 4.32524 8.81107 4.33643 8.75181C4.38162 8.51253 4.7122 8.32732 4.99764 8.38109C5.15523 8.41078 5.25882 8.56331 5.22892 8.72164C5.17476 9.00841 4.88273 9.25038 4.64427 9.20546C4.58535 9.19436 4.52989 9.1649 4.48704 9.11905Z"
                      fill="#212121"
                    />
                    <path
                      d="M2.82227 9.17456L3.02327 9.65096C3.04002 9.69066 3.12214 9.74942 3.31663 9.66682M3.31663 9.66682C3.51112 9.58423 3.52624 9.48418 3.50949 9.44448L3.30849 8.96808M3.31663 9.66682L3.06538 9.07132"
                      stroke="#212121"
                      stroke-width="0.352069"
                      stroke-linecap="round"
                    />
                    <g clip-path="url(#clip0_2222_5786)">
                      <path
                        d="M5.02921 8.10499C5.2629 8.10499 5.45277 7.92525 5.46085 7.70069C5.45277 7.47613 5.2629 7.29639 5.02921 7.29639C4.79554 7.29639 4.60563 7.47613 4.59766 7.70069C4.6056 7.92525 4.79552 8.10499 5.02921 8.10499Z"
                        fill="#212121"
                      />
                      <path
                        d="M5.0291 7.10498C4.70077 7.10498 4.43457 7.37189 4.43457 7.70113C4.43457 8.03035 4.7008 8.29729 5.0291 8.29729C5.3574 8.29729 5.6236 8.03035 5.6236 7.70113C5.6236 7.37189 5.3574 7.10498 5.0291 7.10498ZM5.02907 8.1347C4.79027 8.1347 4.59668 7.94716 4.59668 7.71574C4.59668 7.71081 4.59736 7.70601 4.59752 7.70113C4.59736 7.69626 4.59668 7.69143 4.59668 7.68653C4.59668 7.45511 4.7903 7.26757 5.02907 7.26757C5.26787 7.26757 5.46144 7.45511 5.46144 7.68653C5.46144 7.69143 5.46087 7.69626 5.46074 7.70113C5.4609 7.70601 5.46144 7.71081 5.46144 7.71574C5.46141 7.94716 5.26787 8.1347 5.02907 8.1347Z"
                        fill="#212121"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2222_5786">
                        <rect
                          width="1.72946"
                          height="1.73426"
                          fill="white"
                          transform="translate(4.14355 6.83374)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="flex flex-col items-start justify-center">
                    <p className="font-literata text-[#EFEFEF]">
                      Footies Wallet
                    </p>
                    <p className="font-louis text-[#EFEFEF]">
                      {numberFormat(total + estimated.biaya + biayaLayanan)}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-150 hover:cursor-pointer"
              onClick={() => paymentStep()}
            >
              <path
                d="M15.774 0C19.503 0 22 2.618 22 6.512V15.499C22 19.382 19.503 22 15.774 22H6.237C2.508 22 0 19.382 0 15.499V6.512C0 2.618 2.508 0 6.237 0H15.774ZM15.928 9.6811C15.202 9.6811 14.608 10.274 14.608 11C14.608 11.726 15.202 12.32 15.928 12.32C16.654 12.32 17.237 11.726 17.237 11C17.237 10.274 16.654 9.6811 15.928 9.6811ZM11 9.6811C10.274 9.6811 9.68 10.274 9.68 11C9.68 11.726 10.274 12.32 11 12.32C11.726 12.32 12.32 11.726 12.32 11C12.32 10.274 11.726 9.6811 11 9.6811ZM6.072 9.6811C5.346 9.6811 4.752 10.274 4.752 11C4.752 11.726 5.346 12.32 6.072 12.32C6.798 12.32 7.392 11.726 7.392 11C7.392 10.274 6.798 9.6811 6.072 9.6811Z"
                fill="#F6C73B"
              />
            </svg>
          </div>
          <button
            onClick={() => bayar()}
            className="mx-auto block w-full rounded-lg bg-primary-300 py-5 font-louis text-xl"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CartItem = ({
  id,
  name,
  price,
  image,
  desc,
  count,
  last,
  merchantId,
}: {
  id: string;
  name: string;
  price: number;
  image: string;
  desc?: string;
  count: number;
  last: boolean;
  merchantId: string;
}) => {
  // const [count, setCount] = useState(quantity);

  const addToCart = api.transaction.addToCart.useMutation();

  const { refetch: cartRefetch } = api.transaction.getCart.useQuery({
    mitraId: merchantId,
  });

  const handleIncrement = async () => {
    await addToCart.mutateAsync({
      productId: id,
      add: true,
      merchantId,
    });

    await cartRefetch();
  };

  const handleDecrement = async () => {
    if (count > 0) {
      await addToCart.mutateAsync({
        productId: id,
        add: false,
        merchantId,
      });

      await cartRefetch();
    }
  };

  return (
    <>
      <div className="flex flex-row items-start justify-between pb-4">
        <div className="flex flex-row gap-x-5">
          <Image
            src={image}
            alt=""
            width={100}
            height={100}
            className="aspect-square"
          />
          <div className="flex flex-col gap-y-1">
            <p className="font-literata text-xl text-white">{name}</p>
            {desc && <p className="font-louis text-white">{desc}</p>}
          </div>
        </div>
        <p className="mt-1 font-louis text-white">{numberFormat(price)}</p>
      </div>
      <div className="flex flex-row items-center justify-between pb-8">
        <div className="flex flex-row gap-x-5">
          <svg
            width="15"
            height="19"
            viewBox="0 0 15 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scale-150 hover:cursor-pointer"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.39986 0.444336H12.3997C13.5042 0.444336 14.3996 1.33977 14.3996 2.44434V16.4443C14.3996 17.5489 13.5042 18.4443 12.3997 18.4443H2.39986C1.29532 18.4443 0.399902 17.5489 0.399902 16.4443V2.44434C0.399902 1.33977 1.29532 0.444336 2.39986 0.444336ZM4.39937 3.58815C3.9268 3.58815 3.54371 3.97124 3.54371 4.4438C3.54371 4.91636 3.9268 5.29945 4.39937 5.29945H10.3992C10.8718 5.29945 11.2549 4.91636 11.2549 4.4438C11.2549 3.97124 10.8718 3.58815 10.3992 3.58815H4.39937ZM3.54371 8.44414C3.54371 7.97158 3.9268 7.58849 4.39937 7.58849H10.3992C10.8718 7.58849 11.2549 7.97158 11.2549 8.44414C11.2549 8.9167 10.8718 9.29979 10.3992 9.29979H4.39937C3.9268 9.29979 3.54371 8.9167 3.54371 8.44414ZM4.39951 11.5887C3.92695 11.5887 3.54386 11.9718 3.54386 12.4443C3.54386 12.9169 3.92695 13.3 4.39951 13.3H8.39943C8.872 13.3 9.25508 12.9169 9.25508 12.4443C9.25508 11.9718 8.872 11.5887 8.39943 11.5887H4.39951Z"
              fill="#F6C73B"
            />
          </svg>

          <p className="font-louis text-white">Notes</p>
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <svg
            width="23"
            height="27"
            viewBox="0 0 23 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              count === 0 ? "hidden" : "block hover:cursor-pointer"
            }`}
            onClick={handleDecrement}
          >
            <path
              d="M22.8033 13.4672C22.8033 7.41018 17.8931 2.5 11.8361 2.5C5.77908 2.5 0.868896 7.41018 0.868896 13.4672V13.4673C0.868896 19.5243 5.77908 24.4345 11.8361 24.4345C17.8931 24.4345 22.8033 19.5243 22.8033 13.4673V13.4672Z"
              fill="#F6C73B"
            />
            <path
              d="M16.5313 14.706H13.1395H10.7705H7.37866V12.5166H10.7705H13.1395H16.5313V14.706Z"
              fill="#2F2D2D"
            />
          </svg>

          <p
            className={`font-louis text-white ${
              count === 0 ? "hidden" : "block"
            }`}
          >
            {count}
          </p>
          <svg
            width="23"
            height="27"
            viewBox="0 0 23 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={handleIncrement}
          >
            <rect
              x="0.868896"
              y="2.5"
              width="21.9344"
              height="21.9345"
              rx="10.9672"
              fill="#F6C73B"
            />
            <path
              d="M16.5312 14.7058H13.1394V18.1874H10.7704V14.7058H7.37858V12.5164H10.7704V9.03476H13.1394V12.5164H16.5312V14.7058Z"
              fill="#2F2D2D"
            />
          </svg>
        </div>
      </div>
      {!last && <hr className="border-1 h-1 border-primary-300 pb-8" />}
    </>
  );
};
