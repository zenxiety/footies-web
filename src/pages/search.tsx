import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import data from "../components/homepage/data.json";
import PageOne from "../components/searchpage/PageOne";
import PageTwo from "../components/searchpage/PageTwo";
import Navbar from "../components/Navbarbuyer";
import { api } from "../utils/api";
import useDebounce from "../hooks/useDebounce";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [page, setPage] = useState(0);
  const nextFormStep = () => {
    setPage((page) => page + 1);
  };
  const debouncedSearch = useDebounce(searchQuery, 1000);

  const searchMenu = api.user.searchProductandMerchant.useQuery(
    { search: debouncedSearch },
    {
      enabled: debouncedSearch.length > 0,
    }
  );

  useEffect(() => {
    if (searchQuery.length !== 0) {
      setPage(1);
    } else {
      setPage(0);
    }
  }, [searchQuery]);

  const prevFormStep = () => {
    setPage((page) => page - 1);
  };
  const router = useRouter();
  if (page === 0) {
    return (
      <>
        <Navbar />
        <PageOne
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          formStep={page}
          nextFormStep={nextFormStep}
        />
      </>
    );
  } else {
    return (
      <>
        <PageTwo
          data={searchMenu.data}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          formStep={page}
          prevFormStep={prevFormStep}
        />
      </>
    );
  }
};

export default Search;
