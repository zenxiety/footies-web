import { inferRouterOutputs } from "@trpc/server";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AppRouter } from "../../server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

export default function Item({
  index,
  itemPopup,
  setItemPopup,
  menu,
}: {
  index: number;
  itemPopup: number;
  setItemPopup: React.Dispatch<React.SetStateAction<number>>;
  menu: RouterOutput["merchant"]["getMenu"][number] | undefined;
}) {
  const [isAvailable, setIsAvailable] = useState(true);

  const handleStock = () => {
    setIsAvailable(!isAvailable);
  };

  const handlePopup = (index: number) => {
    if (itemPopup == 0) setItemPopup(index);
    else setItemPopup(0);
  };

  return (
    <>
      {/* Item */}
      <div>
        <div className="min-h-40 flex items-center justify-between">
          <div>
            <Image
              src={menu?.gambar || "/seller/borgir.png"}
              alt=""
              width={80}
              height={80}
              className="h-full w-full"
            />
          </div>
          <div className="grow-[2] px-5">
            <span className="font-literata text-[1.1rem] font-medium">
              {menu?.nama}
            </span>
            <p className="font-literata font-medium">
              {menu?.harga}
              <span className="relative ml-2 text-secondary-200">
                {menu?.harga}
                <span className="absolute top-[55%] left-0 right-0 h-[2px] w-full bg-secondary-200" />
              </span>
            </p>
            <div className="mt-1 flex w-[50px] flex-col items-center">
              <button
                className={`flex h-[20px] w-[40px] rounded-full duration-500 ${
                  isAvailable ? "bg-primary-300 " : "bg-secondary-300"
                }`}
                onClick={() => handleStock()}
              >
                <div
                  className={`m-auto h-[14px] w-[14px] rounded-full bg-secondary-400 duration-500 ${
                    isAvailable ? "translate-x-3/4" : "-translate-x-3/4"
                  }`}
                ></div>
              </button>
              <p className="text-[.75rem]">
                {isAvailable ? "Tersedia" : "Habis"}
              </p>
            </div>
          </div>
          <button
            type="button"
            className={`relative ${index == itemPopup ? "z-20" : ""} `}
            onClick={() => handlePopup(index)}
          >
            <svg
              width={28}
              height={28}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 .667a13.334 13.334 0 110 26.667A13.334 13.334 0 0114 .667zm0 2.666a10.667 10.667 0 100 21.333 10.667 10.667 0 000-21.333zM14 12a2 2 0 110 4 2 2 0 010-4zm-6 0a2 2 0 110 4 2 2 0 010-4zm12 0a2 2 0 110 4 2 2 0 010-4z"
                fill="#F6C73B"
              />
            </svg>
          </button>
          <div
            className={`absolute right-[15%] z-20 translate-y-1/3 rounded-lg border-2 bg-secondary-500 px-3 py-4 duration-500 ${
              itemPopup == index ? "" : "pointer-events-none opacity-0"
            }`}
          >
            {/* <div className="top-0 left-0 z-10 h-screen w-screen bg-black/50 backdrop-blur-sm"></div> */}
            <button
              type="button"
              className="flex w-[160px] items-center justify-between"
            >
              <span>Edit Item</span>
              <svg
                width={15}
                height={15}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.67 5.574L9.415 2.356l1.072-1.072c.294-.294.655-.44 1.082-.44.428 0 .788.146 1.082.44l1.073 1.072c.293.294.447.648.46 1.063.012.415-.128.77-.422 1.063L12.67 5.574zm-1.11 1.13l-8.12 8.12H.184v-3.256l8.12-8.12 3.256 3.255z"
                  fill="#EFEFEF"
                />
              </svg>
            </button>
            <hr className="my-4" />
            <button
              type="button"
              className="flex w-[160px] items-center justify-between"
            >
              <span>Duplicate</span>
              <svg
                width={16}
                height={16}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.75 11.5h-.875A.875.875 0 011 10.625v-8.75A.875.875 0 011.875 1h8.75a.875.875 0 01.875.875v.875M5.375 15h8.75a.875.875 0 00.875-.875v-8.75a.875.875 0 00-.875-.875h-8.75a.875.875 0 00-.875.875v8.75a.875.875 0 00.875.875z"
                  stroke="#EFEFEF"
                  strokeWidth={1.75}
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <hr className="my-4" />
            <button
              type="button"
              className="flex w-[160px] items-center justify-between"
            >
              <span className="text-failed">Remove</span>
              <svg
                width={14}
                height={17}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.417 2.333h-3.5v-.875A1.458 1.458 0 008.458 0H5.542a1.458 1.458 0 00-1.459 1.458v.875h-3.5a.583.583 0 000 1.167h.62l.693 11.117c.052.979.802 1.716 1.75 1.716h6.708c.953 0 1.688-.72 1.75-1.713l.693-11.12h.62a.583.583 0 000-1.167zM4.687 14h-.02a.583.583 0 01-.584-.563l-.291-8.166a.584.584 0 111.166-.042l.292 8.167a.584.584 0 01-.563.604zm2.896-.583a.583.583 0 11-1.166 0V5.25a.583.583 0 111.166 0v8.167zM8.75 2.333h-3.5v-.875a.288.288 0 01.292-.291h2.916a.288.288 0 01.292.291v.875zm1.167 11.104a.584.584 0 01-.584.563h-.02a.582.582 0 01-.563-.604l.292-8.167a.584.584 0 011.166.042l-.291 8.166z"
                  fill="#F51C2F"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr className="my-4 border border-others-black" />
      </div>
    </>
  );
}
