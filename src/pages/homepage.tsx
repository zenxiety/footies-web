import React from "react";
import Search from "../components/homepage/Search"
import Promo from "../components/homepage/Promo"
import Kategori from "../components/homepage/Kategori"

const Homepage = () => {
    return(
        <>
            <Search />
            <Promo />
            <Kategori />
        </>
    )
}

export default Homepage;