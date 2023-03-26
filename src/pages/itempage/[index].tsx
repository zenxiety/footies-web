import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import MapboxMap from "../../components/Map";
import data from "../../components/homepage/data.json";
import "@fortawesome/fontawesome-free/css/all.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import { api } from "../../utils/api";

export default function Produk() {
  const router = useRouter();
  const { index } = router.query;
  const [lng, setLng] = useState(110.37767682106005);
  const [lat, setLat] = useState(-7.770797393657097);
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState("");
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike((prev) => !prev);
  };

  const item = data[0]!;

  const { data: menuData } = api.merchant.getSpecificMenu.useQuery(
    index as string
  );

  return (
    <>
      <div className="relative h-full w-full overflow-hidden bg-secondary-500 px-5 pt-12">
        <div className="flex flex-row items-center justify-between">
          <button
            className="fas fa-arrow-left text-3xl text-white "
            onClick={() => router.push(`/storepage/${menuData?.id as string}`)}
          />
          <h1 className="truncate text-4xl text-white">{menuData?.nama}</h1>
          <button className="fa-solid fa-star text-2xl text-white" />
          <button className="fa-solid fa-share-nodes text-2xl text-white" />
        </div>
        <Image
          className="w-full"
          alt=""
          src={menuData?.gambar as string}
          width={100}
          height={100}
        />
        <div className="relative rounded-xl border-2 border-primary-300 bg-secondary-300"></div>
      </div>
    </>
  );
}
