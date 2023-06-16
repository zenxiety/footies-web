import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Category from "../../../components/seller/Category";
import { api } from "../../../utils/api";

export default function MyItems() {
  const menus = api.merchant.getMenuGroupByCategory.useQuery();
  // remove duplicate category

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
        <div className="flex flex-row items-center gap-x-4 pt-8 pl-12 pb-8">
          <Link href="/dashboard">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-[150%] hover:cursor-pointer"
            >
              <path
                d="M6.87502 15.3001L0.275016 8.70006C0.175016 8.60006 0.104015 8.49173 0.0620154 8.37506C0.0200154 8.25839 -0.000651042 8.13339 1.56251e-05 8.00006C1.56251e-05 7.86673 0.0210158 7.74173 0.0630158 7.62506C0.105016 7.50839 0.175682 7.40006 0.275016 7.30006L6.87502 0.70006C7.05835 0.516727 7.28768 0.421061 7.56302 0.413061C7.83835 0.405061 8.07568 0.500727 8.27501 0.70006C8.47501 0.883394 8.57935 1.11273 8.58802 1.38806C8.59668 1.66339 8.50068 1.90073 8.30002 2.10006L3.40002 7.00006H14.575C14.8583 7.00006 15.096 7.09606 15.288 7.28806C15.48 7.48006 15.5757 7.71739 15.575 8.00006C15.575 8.28339 15.4793 8.52106 15.288 8.71306C15.0967 8.90506 14.859 9.00073 14.575 9.00006H3.40002L8.30002 13.9001C8.48335 14.0834 8.57935 14.3167 8.58802 14.6001C8.59668 14.8834 8.50068 15.1167 8.30002 15.3001C8.11668 15.5001 7.88335 15.6001 7.60002 15.6001C7.31668 15.6001 7.07502 15.5001 6.87502 15.3001Z"
                fill="#EFEFEF"
              />
            </svg>
          </Link>

          <p className="font-literata text-xl text-white">Daganganku</p>
        </div>
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
        {menus?.data?.map(({ category, data }, i) => {
          return <Category key={i} menus={data} title={category ?? ""} />;
        })}
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
