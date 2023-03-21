import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Category from "../../../components/seller/Category";
import { api } from "../../../utils/api";

export default function MyItems() {
  // const menus = [
  //   {
  //     name: "Menu1",
  //     price: 1000,
  //     isAvailable: false,
  //     category: ["promo"],
  //     id: 1,
  //   },
  //   {
  //     name: "Menu2",
  //     price: 2000,
  //     isAvailable: false,
  //     category: ["promo"],
  //     id: 2,
  //   },
  //   {
  //     name: "Menu3",
  //     price: 2000,
  //     isAvailable: false,
  //     category: ["promo"],
  //     id: 3,
  //   },
  // ];

  const menus = api.merchant.getMenu.useQuery();

  const [category, setCategory] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  const handleStock = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <>
      <style jsx>{`
        #horz-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <Head>
        <title>My Items - Footies</title>
      </Head>
      <section className="relative min-h-screen overflow-hidden bg-secondary-500 pt-[2.5vh] font-louis text-others-white">
        {/* Category Bar */}
        <div className="flex gap-x-2 overflow-scroll" id="horz-scroll">
          <button
            type="button"
            className="ml-5 flex items-center gap-x-1 rounded-full bg-others-white px-3 py-2 text-secondary-500"
          >
            <svg
              width={14}
              height={16}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.561 2.458a.822.822 0 00-.579.238.81.81 0 00.58 1.388.822.822 0 00.578-.238.81.81 0 00-.579-1.388zm-2.317 0c.169-.476.483-.889.898-1.18a2.47 2.47 0 012.839 0c.415.291.729.704.898 1.18h5.872c.217 0 .425.085.579.238a.81.81 0 010 1.15.822.822 0 01-.58.238H6.88c-.17.476-.483.888-.898 1.18a2.47 2.47 0 01-2.84 0 2.442 2.442 0 01-.897-1.18h-.958a.822.822 0 01-.58-.238.81.81 0 010-1.15.822.822 0 01.58-.238h.958zm7.23 4.878a.822.822 0 00-.578.238.81.81 0 00.579 1.389.822.822 0 00.579-.239.81.81 0 000-1.15.822.822 0 00-.58-.238zm-2.317 0c.17-.476.483-.888.898-1.18a2.47 2.47 0 012.84 0c.415.292.728.704.898 1.18h.958c.217 0 .425.086.579.238a.81.81 0 01-.58 1.389h-.957c-.17.476-.483.888-.899 1.18a2.47 2.47 0 01-2.839 0 2.442 2.442 0 01-.898-1.18H1.286a.822.822 0 01-.58-.239.81.81 0 01.58-1.388h5.871zm-2.596 4.879a.822.822 0 00-.579.238.81.81 0 00.58 1.388.822.822 0 00.578-.238.81.81 0 00-.579-1.388zm-2.317 0c.169-.476.483-.889.898-1.18a2.47 2.47 0 012.839 0c.415.291.729.704.898 1.18h5.872c.217 0 .425.085.579.238a.81.81 0 01-.58 1.388H6.88c-.17.476-.483.888-.898 1.18a2.47 2.47 0 01-2.84 0 2.442 2.442 0 01-.897-1.18h-.958a.822.822 0 01-.58-.238.81.81 0 01.58-1.388h.958z"
                fill="#2F2D2D"
              />
            </svg>
            Filter
          </button>
          <button
            type="button"
            className={`rounded-full px-5 py-2 text-secondary-500 duration-500 ${
              category == 0 ? "bg-primary-300" : "bg-others-white"
            }`}
            onClick={() => setCategory(0)}
          >
            Semua
          </button>
          <button
            type="button"
            className={`rounded-full px-5 py-2 text-secondary-500 duration-500 ${
              category == 1 ? "bg-primary-300" : "bg-others-white"
            }`}
            onClick={() => setCategory(1)}
          >
            Promo
          </button>
          <button
            type="button"
            className={`rounded-full px-5 py-2 text-secondary-500 duration-500 ${
              category == 2 ? "bg-primary-300" : "bg-others-white"
            }`}
            onClick={() => setCategory(2)}
          >
            Lainnya
          </button>
        </div>
        {/* Promo */}
        <Category menus={menus.data} />
        {/* Promo */}
        <Category menus={menus.data} />
      </section>
      {/* Tambah Menu */}
      <Link href="./my-items/add">
        <button className="fixed bottom-5 left-1/2 flex -translate-x-1/2 gap-x-3 rounded-full bg-primary-300 px-3 py-2">
          <svg
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.333 23.666v-10h-10v-3.333h10v-10h3.334v10h10v3.333h-10v10h-3.334z"
              fill="#4D4D4D"
            />
          </svg>
          <span className="font-louis text-lg font-bold text-secondary-300">
            Tambah Menu
          </span>
        </button>
      </Link>
    </>
  );
}
