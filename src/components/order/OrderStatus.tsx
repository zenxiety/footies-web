import React, { useEffect, useState } from "react";
import Image from "next/image";
import Map from "../Map";
import type { FieldValues, UseFormSetValue } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { SignUpFormValues } from "../../pages/auth/signup";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { distance, numberFormat } from "../../utils/transactions";

const OrderStatus = ({
  rating,
  formStep,
}: {
  rating: () => void;
  formStep: number;
}) => {
  const router = useRouter();
  const { index } = router.query;
  const [hidden, setHidden] = useState(false);
  const hiddenClick = () => {
    setHidden(!hidden);
  };
  const [lng, setLng] = useState(110.37767682106005);
  const [lat, setLat] = useState(-7.770797393657097);
  const [location, setLocation] = useState("");
  const [locationMerchant, setLocationMerchant] = useState("");
  const [coord, setCoord] = useState("");
  const { setValue } = useForm<SignUpFormValues>();

  const getOrder = api.transaction.getOrder.useQuery({
    orderId: index as string,
  });

  const lng_lat = getOrder.data?.User.Alamat[0]?.alamat.split(",");
  const lng_latMerchant = getOrder.data?.Merchant?.alamat.split(",");
  const [estimated, setEstimated] = useState({
    time: 0,
    distance: 0,
    biaya: 0,
  });

  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(
      getOrder.data?.status == "done"
        ? 3
        : getOrder.data?.mitraId
        ? 2
        : getOrder.data?.status == "accepted"
        ? 1
        : 0
    );

    if (getOrder.data?.status == "done") {
      return rating();
    }
  }, [getOrder.data]);

  useEffect(() => {
    if (lng_lat && lng_latMerchant) {
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
    }
  }, [getOrder.data]);

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

  const total =
    getOrder.data?.Cart?.CartMenu.reduce((acc, curr) => {
      return acc + (curr.qty * curr.Menu.harga || 0);
    }, 0) || 0;
  const biayaLayanan = 4000;

  return (
    <div hidden={formStep != 0}>
      <div className={`${hidden ? "hidden" : "relative h-screen"}`}>
        <Map
          setCoord={setCoord}
          coord={coord}
          lat={lat}
          lng={lng}
          location={location}
          setLat={setLat}
          setLng={setLng}
          setLocation={setLocation}
          initialOptions={{}}
          checked={false}
          setValue={setValue as unknown as UseFormSetValue<FieldValues>}
        />
      </div>
      <div
        className={` ${
          hidden ? "" : "fixed"
        } bottom-0 z-50 h-fit w-full max-w-[500px] rounded-t-md bg-[#212121]`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto block cursor-pointer"
          onClick={hiddenClick}
        >
          <g opacity="0.7">
            <path
              d="M2.08366 10.5833C1.68227 10.5833 1.34558 10.4473 1.07358 10.1753C0.801581 9.90334 0.666053 9.56712 0.666997 9.16667C0.666997 8.76528 0.802997 8.42859 1.075 8.15659C1.347 7.88459 1.68322 7.74906 2.08366 7.75H21.917C22.3184 7.75 22.6551 7.88601 22.9271 8.15801C23.1991 8.43001 23.3346 8.76623 23.3337 9.16667C23.3337 9.56806 23.1977 9.90476 22.9257 10.1768C22.6537 10.4488 22.3174 10.5843 21.917 10.5833H2.08366ZM2.08366 16.25C1.68227 16.25 1.34558 16.114 1.07358 15.842C0.801581 15.57 0.666053 15.2338 0.666997 14.8333C0.666997 14.4319 0.802997 14.0953 1.075 13.8233C1.347 13.5513 1.68322 13.4157 2.08366 13.4167H21.917C22.3184 13.4167 22.6551 13.5527 22.9271 13.8247C23.1991 14.0967 23.3346 14.4329 23.3337 14.8333C23.3337 15.2347 23.1977 15.5714 22.9257 15.8434C22.6537 16.1154 22.3174 16.2509 21.917 16.25H2.08366Z"
              fill="#EFEFEF"
            />
          </g>
        </svg>
        <div className="flex scale-150 flex-row items-center justify-center gap-x-1 pt-5">
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.81396 4.43876C8.81396 6.85503 6.85521 8.8138 4.43896 8.8138C2.02272 8.8138 0.0639648 6.85503 0.0639648 4.43876C0.0639648 2.02249 2.02272 0.0637207 4.43896 0.0637207C6.85521 0.0637207 8.81396 2.02249 8.81396 4.43876Z"
              fill="#EFEFEF"
            />
          </svg>
          <svg
            width="94"
            height="1"
            viewBox="0 0 94 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="0.5" x2="94" y2="0.5" stroke="#EAEAEA" />
          </svg>
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.81396 4.43876C8.81396 6.85503 6.85521 8.8138 4.43896 8.8138C2.02272 8.8138 0.0639648 6.85503 0.0639648 4.43876C0.0639648 2.02249 2.02272 0.0637207 4.43896 0.0637207C6.85521 0.0637207 8.81396 2.02249 8.81396 4.43876Z"
              fill="#EFEFEF"
            />
          </svg>
          <svg
            width="94"
            height="1"
            viewBox="0 0 94 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="0.5" x2="94" y2="0.5" stroke="#EAEAEA" />
          </svg>
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.81396 4.43876C8.81396 6.85503 6.85521 8.8138 4.43896 8.8138C2.02272 8.8138 0.0639648 6.85503 0.0639648 4.43876C0.0639648 2.02249 2.02272 0.0637207 4.43896 0.0637207C6.85521 0.0637207 8.81396 2.02249 8.81396 4.43876Z"
              fill="#EFEFEF"
            />
          </svg>
        </div>
        <div className="grid grid-cols-3 items-center pl-16 pt-5 font-louis text-white">
          <h1 className="w-1/2">Pesanan Diterima</h1>
          <h1 className="w-1/2 pl-4">Pesanan Dikirim</h1>
          <h1 className="w-1/2 pl-8">Pesanan Sampai</h1>
        </div>

        <div className="mx-5 my-8 rounded-xl border-2 border-primary-300 bg-[#333333] p-5">
          <div className="flex flex-row gap-x-3">
            <Image src="/assets/terima.png" width={75} height={50} alt="" />
            <div className="flex flex-col justify-center">
              <h1 className="font-literata text-lg font-semibold text-white">
                Processing your order...
              </h1>
              <h1 className="font-louis text-lg text-white">
                {step == 0
                  ? "Restoran akan menerima pesananmu"
                  : step == 1
                  ? "Sedang mencari driver"
                  : step == 2
                  ? "Pesananmu sedang dalam perjalanan"
                  : "Pesananmu telah sampai"}
              </h1>
            </div>
          </div>
        </div>
        <div className={`${hidden ? "block" : "hidden"}`}>
          {getOrder.data?.mitraId && (
            <div className="mx-5 my-8 rounded-xl border-2 border-primary-300 bg-[#1a1a1a] p-5">
              <div className="flex flex-row items-center justify-between">
                <h1 className="font-literata text-xl font-semibold text-white">
                  {getOrder.data.Mitra?.user.name}
                </h1>
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="scale-150"
                >
                  <rect y="2" width="25" height="25" rx="10" fill="#F6C73B" />
                  <g clip-path="url(#clip0_2636_7046)">
                    <path
                      d="M17.8 9H8.2C7.54 9 7.006 9.54 7.006 10.2L7 21L9.4 18.6H17.8C18.46 18.6 19 18.06 19 17.4V10.2C19 9.54 18.46 9 17.8 9ZM9.4 13.2H16.6V14.4H9.4V13.2ZM14.2 16.2H9.4V15H14.2V16.2ZM16.6 12.6H9.4V11.4H16.6V12.6Z"
                      fill="#1A1A1A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2636_7046">
                      <rect x="7" y="9" width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-row gap-x-3 pt-8">
                <Image src="/assets/ferdi.png" width={75} height={50} alt="" />
                <div className="flex flex-col justify-center">
                  <h1 className="font-louis text-lg font-bold text-white">
                    {getOrder.data.Mitra?.Kendaraan?.platNomor}
                  </h1>
                  <h1 className="font-louis text-lg text-white">
                    ID : {getOrder.data.Mitra?.id}
                  </h1>
                </div>
              </div>
            </div>
          )}
          <div className="mx-5 my-8 rounded-xl border-2 border-primary-300 bg-[#1a1a1a] p-5">
            <h1 className="font-literata text-xl font-semibold text-white">
              Rincian Pengiriman
            </h1>
            <div className="flex flex-row gap-x-3 pt-8">
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative top-2 scale-150"
              >
                <mask
                  id="mask0_2632_6659"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="16"
                  height="20"
                >
                  <path
                    d="M3.83301 1.66724V18.3339M1.33301 2.0839V6.25057C1.33301 8.3339 3.83301 8.3339 3.83301 8.3339C3.83301 8.3339 6.33301 8.3339 6.33301 6.25057V2.0839M12.1663 8.3339V18.3339"
                    stroke="white"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.6665 5.00057C14.6665 6.8414 13.5473 8.3339 12.1665 8.3339C10.7857 8.3339 9.6665 6.8414 9.6665 5.00057C9.6665 3.15974 10.7857 1.66724 12.1665 1.66724C13.5473 1.66724 14.6665 3.15974 14.6665 5.00057Z"
                    fill="white"
                    stroke="white"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </mask>
                <g mask="url(#mask0_2632_6659)">
                  <path
                    d="M-2.00049 0.000244141H17.9995V20.0002H-2.00049V0.000244141Z"
                    fill="#F3AA18"
                  />
                </g>
              </svg>

              <div className="flex flex-col justify-start">
                <h1 className="font-louis text-lg text-primary-300">
                  Alamat Restoran
                </h1>
                <h1 className="font-louis text-lg text-white">
                  {locationMerchant}
                </h1>
              </div>
            </div>
            <div className="flex flex-row gap-x-3 pt-8">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative top-2 scale-150"
              >
                <path
                  d="M8.1665 9.00033C8.1665 9.22134 8.2543 9.4333 8.41058 9.58958C8.56686 9.74586 8.77882 9.83366 8.99984 9.83366C9.22085 9.83366 9.43281 9.74586 9.58909 9.58958C9.74537 9.4333 9.83317 9.22134 9.83317 9.00033C9.83317 8.77931 9.74537 8.56735 9.58909 8.41107C9.43281 8.25479 9.22085 8.16699 8.99984 8.16699C8.77882 8.16699 8.56686 8.25479 8.41058 8.41107C8.2543 8.56735 8.1665 8.77931 8.1665 9.00033Z"
                  stroke="#F6C73B"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.5 9.00049C1.5 9.9854 1.69399 10.9607 2.0709 11.8706C2.44781 12.7806 3.00026 13.6073 3.6967 14.3038C4.39314 15.0002 5.21993 15.5527 6.12987 15.9296C7.03982 16.3065 8.01509 16.5005 9 16.5005C9.98491 16.5005 10.9602 16.3065 11.8701 15.9296C12.7801 15.5527 13.6069 15.0002 14.3033 14.3038C14.9997 13.6073 15.5522 12.7806 15.9291 11.8706C16.306 10.9607 16.5 9.9854 16.5 9.00049C16.5 8.01557 16.306 7.0403 15.9291 6.13036C15.5522 5.22042 14.9997 4.39363 14.3033 3.69719C13.6069 3.00075 12.7801 2.4483 11.8701 2.07139C10.9602 1.69448 9.98491 1.50049 9 1.50049C8.01509 1.50049 7.03982 1.69448 6.12987 2.07139C5.21993 2.4483 4.39314 3.00075 3.6967 3.69719C3.00026 4.39363 2.44781 5.22042 2.0709 6.13036C1.69399 7.0403 1.5 8.01557 1.5 9.00049Z"
                  stroke="#F6C73B"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <div className="flex flex-col justify-start">
                <h1 className="font-louis text-lg text-primary-300">
                  Alamat Pengiriman
                </h1>
                <h1 className="font-louis text-lg text-white">{location}</h1>
              </div>
            </div>
            <div className="flex flex-row justify-between pt-5">
              <h1 className="font-louis text-lg text-primary-300">
                Estimasi Jarak
              </h1>
              <h1 className="font-louis text-lg text-white">
                {estimated.distance} Km
              </h1>
            </div>
          </div>
          <div className="mx-5 my-8 rounded-xl border-2 border-primary-300 bg-[#1a1a1a] p-5">
            <h1 className="pb-8 font-literata text-xl font-semibold text-white">
              {getOrder.data?.Cart?.CartMenu.length} Produk
            </h1>
            <div className="flex flex-row justify-between">
              <h1 className="font-literata text-xl text-white">
                {getOrder.data?.Cart?.CartMenu[0]?.Menu.nama}
              </h1>
              <h1 className="font-louis text-xl text-white">
                {getOrder.data?.Cart?.CartMenu[0]?.qty}
              </h1>
            </div>
            {/* <h1 className="py-1 font-louis text-white">
              • Level pedas : Tidak pedas
            </h1>
            <h1 className="font-louis text-white">• Es batu : Less ice</h1> */}
            <h1 className="pt-2 font-louis text-primary-300">
              Lihat Detail Pesanan &gt;
            </h1>
          </div>
          <div className="mx-5 mt-4 items-center justify-between rounded-xl border-2 border-primary-300 p-5">
            <h1 className=" mb-4 font-literata text-xl font-light text-white">
              Rincian Pembayaran
            </h1>
            <div className="mb-4 flex flex-row justify-between gap-x-5 text-lg">
              <h1 className=" font-literata font-light text-white">
                Harga ({getOrder.data?.Cart?.CartMenu.length} menu)
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
        <button
          className="mt-6 w-full rounded-xl bg-[#B2371E] p-5 text-center font-louis text-xl text-white disabled:bg-[#B2371E]/50"
          // onClick={() => rating()}
          disabled={step != 0}
        >
          Batalkan Pesanan
        </button>
      </div>
    </div>
  );
};
export default OrderStatus;
