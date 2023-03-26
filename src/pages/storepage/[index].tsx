import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import MapboxMap from "../../components/Map";
import data from "../../components/homepage/data.json";
import "@fortawesome/fontawesome-free/css/all.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import { api } from "../../utils/api";
import { useForm } from "react-hook-form";

export default function Produk() {
  const router = useRouter();
  const { index } = router.query;
  const [lng, setLng] = useState(110.37767682106005);
  const [lat, setLat] = useState(-7.770797393657097);
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState("");
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike((prev) => !prev);
  };

  const { data: merchantData } = api.user.getSpecificMerchant.useQuery({
    id: "clfl1h63q0004ueowt6drtqh5",
  });

  const { setValue } = useForm();

  useEffect(() => {
    if (merchantData) {
      const loc = merchantData.alamat.split(",");
      setLat(Number(loc[0]));
      setLng(Number(loc[1]));
    }

    console.log(merchantData);
  }, [merchantData]);

  const item = data[0]!;

  return (
    <>
      <div className="relative h-full w-full overflow-hidden bg-secondary-500 px-5 pt-12">
        <div className="flex flex-row items-center justify-between">
          <button
            className="fas fa-arrow-left text-3xl text-white "
            onClick={() => router.push("/homepage")}
          />
          <div className="flex flex-row items-center justify-between gap-x-3 text-3xl">
            <button className="fa-solid fa-magnifying-glass text-white" />
            <button className="fa-solid fa-star text-white" />
            <button className="fa-solid fa-share-nodes text-white" />
          </div>
        </div>
        <div className="relative mt-5 h-[20vh] w-full">
          <MapboxMap
            setCoord={setCoord}
            coord={coord}
            lat={lat}
            lng={lng}
            location={location}
            setLat={setLat}
            setLng={setLng}
            setLocation={setLocation}
            initialOptions={{}}
            checked={false} // keknya bakal checkbox use my location
            setValue={setValue}
          />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <svg
              width={31}
              height={39}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.667 19.333c1.008 0 1.871-.359 2.59-1.078.719-.718 1.078-1.581 1.076-2.588 0-1.009-.359-1.872-1.078-2.59-.718-.72-1.581-1.078-2.588-1.077-1.009 0-1.872.36-2.59 1.078-.72.719-1.078 1.582-1.077 2.589 0 1.008.36 1.871 1.078 2.59.719.719 1.582 1.078 2.589 1.076zm0 18.334c-4.92-4.186-8.594-8.074-11.022-11.664C2.216 22.413 1 19.09 1 16.033 1 11.45 2.475 7.8 5.424 5.08 8.374 2.36 11.787 1 15.667 1s7.295 1.36 10.244 4.08c2.95 2.719 4.424 6.37 4.422 10.953 0 3.056-1.215 6.38-3.644 9.97-2.43 3.59-6.104 7.479-11.022 11.664z"
                fill="#F6C73B"
                stroke="#000"
              />
            </svg>
          </div>
        </div>
        <h1 className="py-5 font-literata text-2xl font-bold text-white">
          {merchantData?.nama}
        </h1>
        <div className="flex flex-row items-center justify-start">
          {item.partner == true ? (
            <div className="flex justify-center rounded-full bg-failed px-5 font-literata text-xl text-white">
              <h1>Super Partner</h1>
            </div>
          ) : (
            ""
          )}
          <div className=" px-5 font-literata text-white">
            {merchantData?.labels.map((label, i) => {
              return <h1 key={i}>{label}</h1>;
            })}
          </div>
        </div>
        <div className="mx-1 mt-5 grid grid-cols-4 gap-x-2">
          <div className="flex flex-col items-center justify-center rounded-md bg-secondary-300 p-3 font-literata font-light text-white">
            <div className="flex flex-row items-center gap-x-2">
              <i className="fas fa-star text-white" />
              <h1>{merchantData?.rating}</h1>
            </div>
            <h1 className="text-sm">32k+ rating</h1>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md bg-secondary-300 p-3 font-literata font-light text-white">
            <div className="flex flex-row items-center gap-x-2">
              <i className="fas fa-location-dot text-white" />
              <h1>{item.jarak}</h1>
            </div>
            <h1 className="text-sm">Distance</h1>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md bg-secondary-300 font-literata font-light text-white">
            <div className="flex flex-row items-center justify-center gap-x-2">
              <i className="fas fa-clock text-white" />
              <h1>{item.waktu}</h1>
            </div>
            <h1 className="items-center text-center text-sm">Waktu Tempuh</h1>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md bg-secondary-300 p-3 font-literata font-light text-white">
            <div className="flex flex-row items-center gap-x-2">
              <Image
                className="scale-[75%]"
                src={item.halal ? "/assets/halal.png" : "/assets/haram.png"}
                alt=""
                width={25}
                height={25}
              />
              <h1>{item.halal ? "Halal" : "Haram"}</h1>
            </div>
            <h1 className="text-sm">Certified</h1>
          </div>
        </div>
        <Swiper
          // scrollbar={{ draggable: false }}
          onSwiper={(swiper) => console.log(swiper)}
          className="my-6 h-[150%]"
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          slidesPerView={1.5}
          spaceBetween={30}
          grabCursor={true}
          effect="coverflow"
          coverflowEffect={{
            scale: 1,
            rotate: 0,
            stretch: 0,
            depth: 0,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2500,
          }}
          direction="horizontal"
          centeredSlides={true}
        >
          {item.voucher.map(({ persen, sampai }, i) => {
            return (
              <SwiperSlide key={i} className="w-full">
                <div className="rounded-md bg-secondary-300 p-5">
                  <div className="flex flex-row items-center justify-between gap-x-2">
                    <i className="fas fa-ticket -rotate-45 text-4xl text-primary-300" />
                    <h1 className="text-light font-literata text-sm text-white">
                      Diskon {persen} s/d {sampai}
                    </h1>

                    <button className="rounded-full bg-primary-300 px-3 py-1 font-literata">
                      Klaim
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="h-full w-full rounded-t-2xl bg-secondary-300 px-3">
          <div className="flex flex-row items-center gap-x-2 py-3">
            <Image
              className=""
              src="/assets/fire.png"
              alt=""
              width={25}
              height={25}
            />
            <h1 className="font-literata text-white">Hot Deals</h1>
          </div>

          {merchantData?.Menu.map((item) => {
            return (
              <>
                <div className="flex flex-row items-start justify-between gap-x-2 py-3 text-white">
                  <div className="flex flex-row justify-between gap-x-2">
                    <Image src={item.gambar} alt="" width={100} height={50} />
                    <button
                      className="flex flex-col items-start justify-center gap-y-1"
                      onClick={() => router.push(`/itempage/${item.id}`)}
                    >
                      <h1 className="font-literata text-xl">{item.nama}</h1>
                      <h1 className="font-louis text-sm">{item.deskripsi}</h1>
                      <div className="flex flex-row items-center gap-x-2">
                        <h1
                          className={
                            item.promo
                              ? "rounded-full bg-failed py-1 px-3 font-literata text-white"
                              : "hidden"
                          }
                        >
                          Promo
                        </h1>
                        <h1 className="font-literata">{item.harga}</h1>
                      </div>
                    </button>
                  </div>
                  <button
                    className={`fas fa-heart text-xl ${
                      like ? "text-failed" : "text-white"
                    }`}
                    onClick={toggleLike}
                  />
                </div>
                <div className="flex flex-row items-center justify-between font-literata font-light">
                  <div className="flex flex-row items-center gap-x-2 py-3">
                    <Image
                      src="/assets/custom.png"
                      alt=""
                      width={25}
                      height={25}
                    />
                    <h1 className="text-white">Customizable</h1>
                  </div>
                  <svg
                    width="23"
                    height="27"
                    viewBox="0 0 23 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.869141"
                      y="2.5"
                      width="21.9344"
                      height="21.9345"
                      rx="10.9672"
                      fill="#F6C73B"
                    />
                    <path
                      d="M16.5315 14.7058H13.1396V18.1874H10.7707V14.7058H7.37883V12.5164H10.7707V9.03476H13.1396V12.5164H16.5315V14.7058Z"
                      fill="#000000"
                    />
                  </svg>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
