import React, { useState, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

import data from "./data.json";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the data based on the search query
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="h-full w-full rounded-b-xl bg-secondary-400">
        <div className="flex flex-col justify-center p-5">
          <div className="flex flex-row justify-center gap-x-6">
            <i className="fas fa-location-dot text-4xl text-primary-300" />
            <div className="flex flex-col">
              <h1 className="font-louis font-extralight text-secondary-100">
                Kirim ke
              </h1>
              <h1 className="font-louis text-white">
                Jl. Jalan sama kamu tapi apa mungkin No. 12
              </h1>
            </div>
          </div>
          <input
            className="m-5 rounded-full bg-white p-3"
            placeholder="Mau makan apa hari ini?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Swiper
            // scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            className="bullets my-12 flex h-full w-full flex-col justify-start bg-secondary-300 px-5"
            // onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
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
            {filteredData.map(({ image, title, jarak, rating }, i) => {
              return (
                <SwiperSlide
                  key={i}
                  className="flex h-full flex-col justify-start rounded-3xl bg-white"
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
                      <p className="text-start font-louis text-xl font-light">
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
      </div>
    </>
  );
};

export default Search;
