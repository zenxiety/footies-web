import Head from "next/head";
import PesananMasuk from "../../../components/seller/PesananMasuk";
import { Fragment, Dispatch, SetStateAction, useState, useEffect } from "react";
import PesananBatal from "../../../components/seller/PesananBatal";
import Image from "next/image";

import { Role } from "@prisma/client";
import PesananSelesai from "../../../components/seller/PesananSelesai";
import Navbar from "../../../components/Navbardriver";
import DetailRute from "../../../components/driver/DetailRute";
import { distance, numberFormat } from "../../../utils/transactions";
import { api } from "../../../utils/api";

const MyOrders = () => {
  const [roles, setRoles] = useState<Role>("MITRA");

  const [pop, setPop] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [complete, setComplete] = useState(false);
  const [detailPesanan, setDetailPesanan] = useState(false);

  const [menerimaPesanan, setMenerimaPesanan] = useState(false);
  const [rute, setRute] = useState(false);

  const [sectionIdx, setSectionIdx] = useState(0);
  const sectionLabel = ["dalam proses", "riwayat"];

  const getOrder = api.transaction.getOrderMitra.useQuery();

  useEffect(() => {
    const data =
      getOrder.data?.filter(
        (item) => item.status == "accepted" && item.mitraId == null
      ) || [];
    if (data && data.length > 0) {
      console.log(data);
      setPop(true);
    }
  }, [getOrder.data]);

  const handleCancel = () => {
    setPop(false);
    setCancel(true);
  };

  const acceptOrder = api.transaction.acceptOrderMitra.useMutation();
  const getMitraId = api.user.getMitraProfile.useQuery();
  const finishOrder = api.transaction.finishOrderMitra.useMutation();

  const [location, setLocation] = useState("");
  const [locationMerchant, setLocationMerchant] = useState("");

  const totalOrderPending =
    getOrder.data?.filter(
      (item) => item.status == "accepted" && item.mitraId == null
    ) || [];

  const selectedOrder =
    getOrder.data?.filter(
      (item) =>
        item.status == "accepted" && item.mitraId == getMitraId.data?.Mitra?.id
    ) || [];

  const lng_lat = selectedOrder[0]?.User.Alamat[0]?.alamat.split(",");
  const lng_latMerchant = selectedOrder[0]?.Merchant?.alamat.split(",");
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

    fetch(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${lng_latMerchant![1]!}%2C${lng_latMerchant![0]!}`
    )
      .then((res) => res.json())
      .then((data: { address: { Match_addr: string } }) =>
        setLocationMerchant(data.address.Match_addr)
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
  return (
    <>
      <Head>
        <title>My Orders - Footies</title>
      </Head>
      <style jsx>{`
        .countdown {
          animation: countdown 15s linear infinite;
        }

        @keyframes countdown {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
      <section
        className={`relative flex h-screen flex-col justify-between overflow-hidden bg-secondary-500 pt-[2.5vh] font-louis text-others-white`}
      >
        <div>
          <span className="ml-5 font-literata text-2xl">Pesanan</span>
          <hr className="my-4 border-secondary-300" />
          <div className="mx-5 flex justify-between">
            <span className="font-bold">Menerima Pesanan</span>
            <button
              className={`relative h-5 w-10 rounded-full duration-500 ${
                menerimaPesanan ? "bg-primary-300" : "bg-secondary-300"
              }`}
              onClick={() => setMenerimaPesanan(!menerimaPesanan)}
            >
              <div
                className={`absolute top-1/2 left-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-secondary-400 duration-500 ${
                  menerimaPesanan ? "translate-x-[25%]" : "-translate-x-[125%]"
                }`}
              ></div>
            </button>
          </div>
        </div>

        <div className="mt-4 flex h-full flex-col justify-between bg-secondary-400 px-5 py-4 pb-20">
          <span className="text-xl font-bold">Pesanan Masuk</span>;
          {getOrder.data?.map((item) => {
            if (item.status == "accepted" && item.mitraId == null) {
              return (
                <>
                  <div className="my-3 font-bold">
                    <p className="leading-tight text-secondary-100">
                      Pemesan: {item.User.firstName} {item.User.lastName}
                    </p>
                    <p className="leading-tight text-secondary-100">
                      ID Pesanan: {item.id}
                    </p>
                  </div>
                  <p className="font-bold">
                    <span className="text-primary-300">Restoran</span>
                    <span className="mx-[.3em]">:</span>Burger Klenger,
                    Tegalrejo
                  </p>
                  <div className="mt-3">
                    <div className="flex">
                      <Image
                        src="/assets/spoon-fork.svg"
                        alt=""
                        width={20}
                        height={20}
                        quality={100}
                      />
                      <div className="ml-4">
                        <p className="text-xs leading-none text-secondary-100">
                          Alamat Restoran
                        </p>
                        <p>Burger Klenger, Tegalrejo</p>
                      </div>
                    </div>
                    <div className="my-2 flex w-5 flex-col items-center justify-center gap-y-[2px]">
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                    </div>
                    <div className="flex">
                      <Image
                        src="/assets/target.svg"
                        alt=""
                        width={20}
                        height={20}
                        quality={100}
                        className="scale-125"
                      />
                      <div className="ml-4">
                        <p className="max-h-[1em] overflow-hidden text-xs leading-none text-secondary-100">
                          Alamat Tujuan • 2.0 KM
                        </p>
                        <p className="">
                          Jl. Jalan Sama Kamu Tapi Apa Mung... Jl. Jalan Sama
                          Kamu Tapi Apa Mung...Jl. Jalan Sama Kamu Tapi Apa
                          Mung...
                        </p>
                      </div>
                    </div>
                    <button
                      className="mt-2 text-xs text-primary-300"
                      onClick={() => setRute(true)}
                    >
                      Lihat Rute &gt;
                    </button>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-literata text-xl font-bold text-primary-300">
                      {item.Cart?.CartMenu.length} Items
                    </span>
                    <span className="font-bold">
                      {numberFormat(item.total)}
                    </span>
                  </div>
                  <p>{item.Cart?.CartMenu.map((item) => item.Menu.nama)}</p>
                  <button className="mt-2 mr-auto text-xs text-primary-300">
                    Lihat Detail Pesanan &gt;
                  </button>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-[1.1rem] font-bold leading-tight text-primary-300">
                        Ongkir Driver
                      </p>
                      <p className="leading-tight text-secondary-100">Cash</p>
                    </div>
                    <span className="font-bold">
                      {numberFormat(item.total)}
                    </span>
                  </div>
                  <div className="relative flex justify-between bg-secondary-400 pt-6 pb-10">
                    <button onClick={() => handleCancel()}>
                      <Image
                        src="/assets/cancel.svg"
                        alt=""
                        width={20}
                        height={20}
                        quality={100}
                      />
                    </button>
                    <button
                      onClick={async () => {
                        await acceptOrder.mutateAsync({
                          orderId: item.id,
                        });

                        await getOrder.refetch();
                      }}
                      className="rounded-full bg-primary-300 py-2 px-4 font-bold text-secondary-400"
                    >
                      Terima
                    </button>
                    <div className="absolute bottom-4 h-1 w-full bg-secondary-300"></div>
                    <div
                      className={`countdown absolute bottom-4 h-1 bg-white`}
                    ></div>
                  </div>
                </>
              );
            }

            if (
              item.status == "accepted" &&
              item.mitraId == getMitraId.data?.Mitra?.id
            ) {
              return (
                <>
                  <div className="my-3 font-bold">
                    <p className="leading-tight text-secondary-100">
                      Pemesan: {item.User.firstName} {item.User.lastName}
                    </p>
                    <p className="leading-tight text-secondary-100">
                      ID Pesanan: {item.id}
                    </p>
                  </div>
                  <p className="font-bold">
                    <span className="text-primary-300">Restoran</span>
                    <span className="mx-[.3em]">:</span>
                    {item.Merchant?.nama}
                  </p>
                  <div className="mt-3">
                    <div className="flex">
                      <Image
                        src="/assets/spoon-fork.svg"
                        alt=""
                        width={20}
                        height={20}
                        quality={100}
                      />
                      <div className="ml-4">
                        <p className="text-xs leading-none text-secondary-100">
                          Alamat Restoran
                        </p>
                        <p>{locationMerchant}</p>
                      </div>
                    </div>
                    <div className="my-2 flex w-5 flex-col items-center justify-center gap-y-[2px]">
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                    </div>
                    <div className="flex">
                      <Image
                        src="/assets/target.svg"
                        alt=""
                        width={20}
                        height={20}
                        quality={100}
                        className="scale-125"
                      />
                      <div className="ml-4">
                        <p className="max-h-[1em] overflow-hidden text-xs leading-none text-secondary-100">
                          Alamat Tujuan • {estimated.distance} KM
                        </p>
                        <p className="">{location}</p>
                      </div>
                    </div>
                    <button
                      className="mt-2 text-xs text-primary-300"
                      onClick={() => setRute(true)}
                    >
                      Lihat Rute &gt;
                    </button>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-literata text-xl font-bold text-primary-300">
                      {item.Cart?.CartMenu.length} Items
                    </span>
                    <span className="font-bold">
                      {numberFormat(
                        item.total - estimated.biaya - biayaLayanan
                      )}
                    </span>
                  </div>
                  <p>{item.Cart?.CartMenu.map((item) => item.Menu.nama)}</p>
                  <button className="mt-2 mr-auto text-xs text-primary-300">
                    Lihat Detail Pesanan &gt;
                  </button>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-[1.1rem] font-bold leading-tight text-primary-300">
                        Ongkir Driver
                      </p>
                      <p className="leading-tight text-secondary-100">
                        {item.MetodePembayaran == "CASH" ? "Cash" : "Wallet"}
                      </p>
                    </div>
                    <span className="font-bold">
                      {numberFormat(estimated.biaya)}
                    </span>
                  </div>
                  <div className="relative flex justify-between bg-secondary-400 pt-6 pb-10">
                    <button
                      onClick={async () => {
                        await finishOrder.mutateAsync({
                          orderId: item.id,
                        });

                        await getOrder.refetch();
                      }}
                      className="ml-auto rounded-full bg-primary-300 py-2 px-4 font-bold text-secondary-400"
                    >
                      Selesaikan
                    </button>
                    <div className="absolute bottom-4 h-1 w-full bg-secondary-300"></div>
                    <div
                      className={`countdown absolute bottom-4 h-1 bg-white`}
                    ></div>
                  </div>
                </>
              );
            }
          })}
        </div>

        <PesananMasuk
          roles={roles}
          pop={pop}
          setPop={setPop}
          cancel={cancel}
          complete={complete}
          detailPesanan={detailPesanan}
          setCancel={setCancel}
          setComplete={setComplete}
          setDetailPesanan={setDetailPesanan}
          onClick={async () => {
            await acceptOrder.mutateAsync({
              orderId: getOrder.data?.filter(
                (item) => item.status == "accepted" && item.mitraId == null
              )[0]?.id as string,
            });

            await getOrder.refetch();
          }}
          data={
            getOrder.data?.filter(
              (item) => item.status == "accepted" && item.mitraId == null
            )[0]
          }
        />
        <PesananBatal cancel={cancel} setCancel={setCancel} />
        <PesananSelesai complete={complete} setComplete={setComplete} />
        <DetailRute rute={rute} setRute={setRute} />
        <div className="grid w-full place-content-center">
          <button onClick={() => setPop(!pop)} className="bg-primary-500 p-4">
            <span className="text-xl">{pop}</span>
          </button>
        </div>
        <Navbar />
      </section>
    </>
  );
};

export default MyOrders;
