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
    title: "Burger Klenger, Tegalrejo",
    image: "/assets/burger.png",
    jarak: "0.2 km",
    rating: "4.9",
  },
  {
    title: "Burger Klenger, Tegalrejo",
    image: "/assets/burger.png",
    jarak: "0.2 km",
    rating: "4.9",
  },
  {
    title: "Burger Klenger, Tegalrejo",
    image: "/assets/burger.png",
    jarak: "0.2 km",
    rating: "4.9",
  },
  {
    title: "Burger Klenger, Tegalrejo",
    image: "/assets/burger.png",
    jarak: "0.2 km",
    rating: "4.9",
  },
  {
    title: "Burger Klenger, Tegalrejo",
    image: "/assets/burger.png",
    jarak: "0.2 km",
    rating: "4.9",
  },
  {
    title: "Burger Klenger, Tegalrejo",
    image: "/assets/burger.png",
    jarak: "0.2 km",
    rating: "4.9",
  },
];

const Terdekat = () => {
  const swiper = useSwiper();
  const swiperRef = useRef();
  const [swiperIndex, setSwiperIndex] = useState(0);
  return (
    <>
      <div className="mt-12 h-full w-full overflow-hidden rounded-xl bg-secondary-300 pt-5">
        <h1 className="px-5 font-literata text-2xl text-white">
          Restoran Terdekat
        </h1>
        <Swiper
          // scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          className="bullets my-12 flex h-full w-full flex-col justify-start bg-secondary-300 px-5"
          onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          slidesPerView={2}
          spaceBetween={10}
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
          {data.map(({ image, title, jarak, rating }, i) => {
            return (
              <SwiperSlide
                key={i}
                className="flex flex-col justify-start rounded-3xl bg-white"
              >
                <>
                  <Image
                    src={image}
                    alt=""
                    className="mx-auto block rounded-3xl border-2"
                    width={250}
                    height={250}
                  />
                  <div className="flex flex-col items-start py-5 pl-5">
                    <p className="text-start font-louis text-xl font-light">
                      {jarak}
                    </p>
                    <p className=" block font-literata text-xl font-light">
                      {title}
                    </p>
                    <div className="flex flex-row items-center justify-start gap-x-2">
                      <i className="fas fa-star text-primary-300" />
                      <p className=" mx-auto block font-louis text-xl font-light">
                        {rating}
                      </p>
                    </div>
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
