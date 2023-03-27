import React, { useState, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import Image from "next/image";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import data from "../components/homepage/data.json";
import History from "../components/searchpage/History";
import SearchQuery from "../components/searchpage/SearchQuery";
import Jenis from "../components/searchpage/Jenis";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const router = useRouter();
  return (
    <>
      <div className="relative h-full w-full bg-secondary-400 p-5">
        <input
          className=" w-full font-louis rounded-full bg-white p-3"
          placeholder="Mau makan apa hari ini?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
        />
      </div>
      
      <History />
      <div className="mx-5 border-t-2 border-secondary-300 pb-5" />
      <h1 className=" font-literata text-2xl text-white">
        Restoran yang telah dicari
      </h1>
      <Swiper
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        className="bullets my-5 flex h-full w-full flex-col justify-start bg-secondary-500 px-5"
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
        {filteredData.map(({ image, title, jarak, rating, id }, i) => {
          return title ? (
            <SwiperSlide
              key={i}
              className="flex max-h-full flex-col justify-start rounded-3xl bg-white hover:cursor-pointer"
              onClick={() => router.push(`/storepage/${id}`)}
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
          ) : (
            <h1>Data not found</h1>
          );
        })}
      </Swiper>
      <div className="mx-5 border-t-2 border-secondary-300 pb-5" />
        <SearchQuery />
        <Jenis />
    </>
  );
};

export default Search;
