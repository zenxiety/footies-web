import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

const data = [
  {
    title: "Makanan Berat",
    image: "/assets/burger.png",
  },
  {
    title: "Makanan Cepat Saji",
    image: "/assets/burger.png",
  },
  {
    title: "Minuman",
    image: "/assets/burger.png",
  },
  {
    title: "Seafood",
    image: "/assets/burger.png",
  },
  {
    title: "Makanan Berat",
    image: "/assets/burger.png",
  },
  {
    title: "Makanan Berat",
    image: "/assets/burger.png",
  },
  {
    title: "Makanan Berat",
    image: "/assets/burger.png",
  },
];

const Promo = () => {
  const swiper = useSwiper();
  const swiperRef = useRef();
  const [swiperIndex, setSwiperIndex] = useState(0);
  return (
    <>
      <div className="h-full w-full overflow-hidden rounded-xl bg-secondary-300 mt-12 pt-5">
        <h1 className="font-literata text-2xl text-white pl-5">Kategori</h1>
        <Swiper
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          className="bullets my-12 h-full w-screen rounded-3xl bg-secondary-300"
          onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          slidesPerView={5}
          spaceBetween={10}
          effect="coverflow"
          coverflowEffect={{
            scale: 1,
            rotate: 0,
            stretch: 1,
            depth: 0,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
          }}
          direction="horizontal"
          // centeredSlides={true}
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
          {data.map(({ image }, i) => {
            return (
              <SwiperSlide key={i} className="w-screen bg-secondary-300">
                <Image
                  src={image}
                  alt=""
                  className="border-2 border-primary-300 rounded-3xl bg-secondary-300"
                  width={500}
                  height={500}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex flex-row justify-between rounded-xl border-2 border-primary-300 p-5 items-center">
          <div className="flex flex-row gap-x-5">
            <i className="fas fa-ticket -rotate-45 text-2xl text-white" />
            <h1 className=" font-literata text-xl text-white">
              Ada 3 promo tersedia
            </h1>
          </div>

          <svg
            width={28}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
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
      </div>
    </>
  );
};

export default Promo;
