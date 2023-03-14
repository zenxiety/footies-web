import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Swiper, SwiperSlide } from 'swiper/react';

const Search = () => {
  return (
    <>
      <div className="h-full w-full bg-secondary-400 rounded-b-xl">
        <div className="flex flex-col justify-center p-5">
          <div className="flex flex-row justify-center gap-x-6">
            <i className="fas fa-location-dot text-primary-300 text-4xl" />
            <div className="flex flex-col">
                <h1 className="font-extralight font-louis text-secondary-100">Kirim ke</h1>
                <h1 className="text-white font-louis">Jl. Jalan sama kamu tapi apa mungkin No. 12</h1>
            </div>
          </div>
          <input className="rounded-full bg-white p-3 m-5" placeholder="Mau makan apa hari ini?" />
        </div>
      </div>
    </>
  );
};

export default Search;
