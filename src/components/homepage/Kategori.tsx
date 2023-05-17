import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import "swiper/swiper-bundle.css";

const data = [
  {
    title: "Makanan Berat",
    image: "/assets/kategori.png",
  },
  {
    title: "Makanan Cepat Saji",
    image: "/assets/kategori.png",
  },
  {
    title: "Minuman",
    image: "/assets/kategori.png",
  },
  {
    title: "Seafood",
    image: "/assets/kategori.png",
  },
  {
    title: "Faris",
    image: "/assets/kategori.png",
  },
  {
    title: "Zaidan",
    image: "/assets/kategori.png",
  },
];

const Terdekat = () => {
  const [active, setActive] = useState(false);
  const toggleKategori = () => {
    setActive((prev) => !prev);
  };

  return (
    <>
      <div className="mt-8 h-full w-full overflow-hidden rounded-xl bg-secondary-300 pt-5">
        <h1 className="px-5 font-literata text-2xl text-white">Kategori</h1>
        <Swiper
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          className="bullets my-12 flex h-full w-full flex-col justify-center bg-secondary-300 px-5"
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          slidesPerView={4}
          spaceBetween={0}
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
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets",
            bulletActiveClass: "swiper-pagination-bullet",
          }}
          navigation={{
            disabledClass: "opacity-100",
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          {data.map(({ image, title }, i) => {
            return (
              <SwiperSlide
                key={i}
                className="flex flex-col justify-start rounded-xl"
              >
                <>
                  <Image
                    src={image}
                    alt=""
                    className={`mx-auto block rounded-xl ${
                      active ? "border-2 border-primary-300" : ""
                    }`}
                    width={100}
                    height={100}
                    // onClick={toggleKategori}
                  />
                  <div className="flex flex-col items-center justify-center py-5 text-center">
                    <p className=" block font-louis text-xl text-white">
                      {title}
                    </p>
                  </div>
                </>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Terdekat;
