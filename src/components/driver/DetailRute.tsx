import Image from "next/image";
import { FieldValues, UseFormSetValue, useForm } from "react-hook-form";
import MapboxMap from "../Map";
import { useEffect, useState } from "react";
import { SellerFormValues } from "../../pages/auth/signup/seller";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const DetailRute = ({
  rute,
  setRute,
}: {
  rute: boolean;
  setRute: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
  } = useForm<SellerFormValues>();
  const router = useRouter();
  const { index } = router.query;

  const getOrder = api.transaction.getOrder.useQuery({
    orderId: index as string,
  });

  const [lng, setLng] = useState(110.37767682106005);
  const [lat, setLat] = useState(-7.770797393657097);
  const [lngMerchant, setLngMerchant] = useState(110.37067682106005);
  const [latMerchant, setLatMerchant] = useState(-7.779797393657097);
  const lng_lat = getOrder.data?.User.Alamat[0]?.alamat.split(",");
  const lng_latMerchant = getOrder.data?.Merchant?.alamat.split(",");

  useEffect(() => {
    if (lng_lat) {
      setLng(lng_lat![0])!;
      setLat(lng_lat![1])!;
      setLngMerchant(lng_latMerchant![0])!;
      setLatMerchant(lng_latMerchant![1])!;
    }
  }, []);

  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState("");

  const [checked, setChecked] = useState(false);

  return (
    <>
      <div
        className={`absolute inset-0 backdrop-blur-sm duration-1000 ${
          rute ? "" : "pointer-events-none opacity-0"
        }`}
      ></div>
      <div
        className={`fixed bottom-0 z-[60] max-h-screen overflow-auto duration-1000 ${
          rute ? "" : "translate-y-[200%]"
        }`}
      >
        <div
          className={`w-full rounded-t-3xl bg-secondary-300 pt-6 duration-1000 xs:w-[500px] ${
            rute ? "" : ""
          }`}
        >
          <div className="mb-4 flex gap-x-5 px-4">
            <button onClick={() => setRute(false)}>
              <Image
                src="/assets/arrow.svg"
                alt=""
                width={20}
                height={20}
                quality={100}
              />
            </button>
            <span>Detail Rute</span>
          </div>
          <p className="px-4 text-xs text-secondary-100">ID Pesanan: 696969</p>
          <div className="relative mt-4 h-[50vh] w-full">
            <MapboxMap
              lat={lat}
              lng={lng}
              latMerchant={latMerchant}
              lngMerchant={lngMerchant}
              coord={coord}
              location={location}
              setLat={setLat}
              setLng={setLng}
              setLocation={setLocation}
              setCoord={setCoord}
              checked={checked}
              initialOptions={{}}
              setValue={setValue as unknown as UseFormSetValue<FieldValues>}
            />
          </div>
          <div className="mt-4 flex px-4">
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
          <div className="my-2 mx-4 flex w-5 flex-col items-center justify-center gap-y-[2px]">
            <div className="h-1 w-1 rounded-full bg-white"></div>
            <div className="h-1 w-1 rounded-full bg-white"></div>
            <div className="h-1 w-1 rounded-full bg-white"></div>
            <div className="h-1 w-1 rounded-full bg-white"></div>
          </div>
          <div className="flex px-4">
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
                Jl. Jalan Sama Kamu Tapi Apa Mung... Jl. Jalan Sama Kamu Tapi
                Apa Mung...Jl. Jalan Sama Kamu Tapi Apa Mung...
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between px-4 font-bold">
            <span className="text-primary-300">Estimasi Jarak</span>
            <span className="">2.0 Km</span>
          </div>
          <div className="mt-6 px-4">
            <div className="relative -mx-4 flex justify-between bg-secondary-400 px-4 pt-6 pb-10">
              <button>
                <Image
                  src="/assets/cancel.svg"
                  alt=""
                  width={20}
                  height={20}
                  quality={100}
                />
              </button>
              <button className="rounded-full bg-primary-300 py-2 px-4 font-bold text-secondary-400">
                Terima
              </button>
              <div className="absolute bottom-4 h-1 w-[calc(100%-2rem)] bg-secondary-300"></div>
              <div className={`absolute bottom-4 h-1 bg-white`}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailRute;
