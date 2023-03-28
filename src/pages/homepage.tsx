import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import Image from "next/image";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

import data from "../components/homepage/data.json";
// import Search from "../components/homepage/Search";
import Promo from "../components/homepage/Promo";
import Kategori from "../components/homepage/Kategori";
// import Terdekat from "../components/homepage/Terdekat";
import Rekomendasi from "../components/homepage/Rekomendasi";
import { api } from "../utils/api";
import useDebounce from "../hooks/useDebounce";
import PageTwo from "../components/searchpage/PageTwo";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 1000);
  const router = useRouter();
  // Filter the data based on the search query
  // const filteredData = data.filter((item) =>
  //   item.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const searchMenu = api.user.searchProductandMerchant.useQuery(
    { search: debouncedSearch },
    {
      enabled: debouncedSearch.length > 0,
    }
  );

  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log(searchQuery.length);
    if (searchQuery.length !== 0) {
      setPage(1);
    } else {
      setPage(0);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log(searchMenu.data);
  }, [searchMenu.data]);
  if (page === 1) {
    return (
      <PageTwo
        formStep={page}
        prevFormStep={() => setPage(0)}
        data={searchMenu.data}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
    );
  } else {
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
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Promo />
        <Kategori />
        <div className="mt-12 h-full w-full overflow-hidden rounded-xl bg-secondary-300 pt-5">
          <h1 className="px-5 font-literata text-2xl text-white">
            Restoran Rekomendasi
          </h1>
          <Swiper
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
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
            {/* {filteredData.map(({ image, title, jarak, rating, id }, i) => {
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
          })} */}
          </Swiper>
        </div>
        <Rekomendasi />
      </>
    );
  }
};

export default Homepage;
