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
    image: "/assets/promo.png",
  },
  {
    image: "/assets/promo.png",
  },
  {
    image: "/assets/promo.png",
  },
  {
    image: "/assets/promo.png",
  },
  {
    image: "/assets/promo.png",
  },
  {
    image: "/assets/promo.png",
  },
  {
    image: "/assets/promo.png",
  },
];

const Promo = () => {
  const [active, setActive] = useState(false);
  const togglePromo = () => {
    setActive((prev) => !prev);
  };
  return (
    <>
      <div className="h-full w-full overflow-hidden rounded-xl bg-secondary-500">
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
          pagination={true}
          
        >
          {data.map(({ image }, i) => {
            return (
              <SwiperSlide key={i} className="w-full">
                <Image
                  src={image}
                  alt=""
                  className="rounded-3xl border-2 border-primary-300"
                  width={500}
                  height={700}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="mx-5 flex flex-row items-center justify-between rounded-xl border-2 border-primary-300 p-5">
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
            className={`${active ? "-rotate-90" : "rotate-180"} duration-300`}
            onClick={togglePromo}
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
        <Image src="/assets/promo.png" alt="" width={500} height={700} className={`${active ? 'block rounded-xl' : 'hidden'} py-5 duration-300 rounded-xl`}/>
      </div>
    </>
  );
};

export default Promo;
