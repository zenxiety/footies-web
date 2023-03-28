import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import data from "../../components/homepage/data.json";
import "@fortawesome/fontawesome-free/css/all.css";
import Pedas from "../../components/itempage/Pedas";
import Toping from "../../components/itempage/Toping";
// import Navbar from "../../components/Navbar";

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
  const [count, setCount] = React.useState(0);


  // const item = data[0]!;

  // const { data: menuData } = api.merchant.getSpecificMenu.useQuery(
  //   index as string
  // );

  return (
    <>
      <div className="relative h-full w-full overflow-hidden bg-secondary-500 pt-12">
        {data.map((item) => {
          if (item.id == index) {
            return (
              <>
                {item.produk.map((item) => {
                  if (item.id == index) {
                    return (
                      <>
                        {/* <Navbar /> */}
                        <div className="flex flex-row items-center justify-between pb-6">
                          <button
                            className="fas fa-arrow-left text-3xl text-white "
                            onClick={() => router.back()}
                          />
                          <h1 className="truncate text-4xl text-white">
                          {item.nama}
                          </h1>
                          <button className="fa-solid fa-star peer hidden text-2xl text-white" />

                          <button className="fa-solid fa-share-nodes text-2xl text-white" />
                        </div>
                        <Image
                          className="w-full"
                          alt=""
                          src={item.image}
                          width={100}
                          height={100}
                        />
                        <div className="relative mx-5 -translate-y-20 rounded-xl border-2 border-primary-300 bg-secondary-500">
                          <div className="flex flex-col items-start gap-y-1 p-3">
                            <h1 className="font-literata text-2xl font-bold text-white">
                              {item.nama}
                            </h1>
                            <h1 className="font-louis text-lg font-thin text-white">
                              {item.deskripsi}
                            </h1>
                            <h1 className="font-literata text-xl font-thin text-primary-300">
                              {item.harga}
                            </h1>
                          </div>
                        </div>
                        <div className="relative rounded-md bg-secondary-400 p-3">
                          <div className="flex flex-col items-start gap-y-1 p-3">
                            <h1 className="font-literata text-2xl text-white">
                              Catatan
                            </h1>
                            <h1 className="text-md font-louis font-thin text-white">
                              Untuk restoran jika kamu ingin memberikan
                              permintaan.
                            </h1>
                            <input
                              type="textarea"
                              className={`peer block w-full appearance-none rounded-md border-2 border-secondary-200 bg-transparent py-2.5 px-0 pl-3 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0 ${count > 300 ? 
                              "focus:border-failed" : "focus:border-primary-300"}`}
                              placeholder="Contoh: Sausnya ditambah"
                              onChange={(e) => setCount(e.target.value.length)}
                            />
                            <h1
                              className={`${
                                count > 300
                                  ? "font-louis text-sm text-failed"
                                  : "hidden"
                              }`}
                            >
                              Panjang melebihi ketentuan
                            </h1>
                            <h1 className="font-louis text-white">
                              {count}/300
                            </h1>
                          </div>
                        </div>
                        <Pedas />
                        <Toping />
                      </>
                    );
                  }
                })}
              </>
            );
          }
        })}
      {/* <div className="relative h-full w-full overflow-hidden bg-secondary-500 px-5 pt-12">
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
        <div className="relative rounded-xl border-2 border-primary-300 bg-secondary-300"></div> */}
      </div>
    </>
  );
}
