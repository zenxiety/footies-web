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
import PageOne from "../components/searchpage/PageOne";
import PageTwo from "../components/searchpage/PageTwo";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [page, setPage] = useState(0);
  const nextFormStep = () => {
    setPage((page) => page + 1);
  };

  const prevFormStep = () => {
    setPage((page) => page - 1);
  };
  const router = useRouter();
  return (
    <>
      <PageOne formStep={page} nextFormStep={nextFormStep} />
      <PageTwo formStep={page} prevFormStep={prevFormStep} />
    </>
  );
};

export default Search;
