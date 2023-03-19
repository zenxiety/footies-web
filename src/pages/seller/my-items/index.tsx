import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function MyItems() {
  const [category, setCategory] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const handleStock = () => {
    setIsAvailable(!isAvailable);
  };

  const [itemPopup, setItemPopup] = useState(0);

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
        {/* Popup Overlay Layer */}
        <div
          onClick={() => setItemPopup(0)}
          className={`absolute inset-0 z-10 bg-black/25 backdrop-blur-sm duration-500 ${
            itemPopup != 0 ? "" : "pointer-events-none opacity-0"
          }`}
        ></div>
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
        <div className="my-4 bg-secondary-400 px-5 py-2">
          <h2 className="font-literata text-xl font-semibold">Promo</h2>
          <hr className="my-4 border border-dashed border-others-black" />
          {/* Item */}
          <div key={1}>
            <div className="flex items-center justify-between">
              <div>
                <Image
                  src="/signup/profile.png"
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div className="grow-[2] px-5">
                <span className="font-literata text-[1.1rem] font-medium">
                  Borgir
                </span>
                <p className="font-literata font-medium">
                  40.000
                  <span className="relative ml-2 text-secondary-200">
                    50.000
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
                className={`relative ${itemPopup == 1 ? "z-20" : ""}`}
                onClick={() => setItemPopup(1)}
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
                  itemPopup == 1 ? "" : "pointer-events-none opacity-0"
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
          {/* Item */}
          <div key={2}>
            <div className="flex items-center justify-between">
              <div>
                <Image
                  src="/signup/profile.png"
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div className="grow-[2] px-5">
                <span className="font-literata text-[1.1rem] font-medium">
                  Borgir
                </span>
                <p className="font-literata font-medium">
                  40.000
                  <span className="relative ml-2 text-secondary-200">
                    50.000
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
                className={`relative ${itemPopup == 2 ? "z-20" : ""}`}
                onClick={() => setItemPopup(2)}
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
                  itemPopup == 2 ? "" : "pointer-events-none opacity-0"
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
        </div>
        {/* Promo */}
        <div className="my-4 bg-secondary-400 px-5 py-2">
          <h2 className="font-literata text-xl font-semibold">Promo</h2>
          <hr className="my-4 border border-dashed border-others-black" />
          {/* Item */}
          <div key={1}>
            <div className="flex items-center justify-between">
              <div>
                <Image
                  src="/signup/profile.png"
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div className="grow-[2] px-5">
                <span className="font-literata text-[1.1rem] font-medium">
                  Borgir
                </span>
                <p className="font-literata font-medium">
                  40.000
                  <span className="relative ml-2 text-secondary-200">
                    50.000
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
                className={`relative ${itemPopup == 1 ? "z-20" : ""}`}
                onClick={() => setItemPopup(1)}
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
                  itemPopup == 1 ? "" : "pointer-events-none opacity-0"
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
          {/* Item */}
          <div key={1}>
            <div className="flex items-center justify-between">
              <div>
                <Image
                  src="/signup/profile.png"
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div className="grow-[2] px-5">
                <span className="font-literata text-[1.1rem] font-medium">
                  Borgir
                </span>
                <p className="font-literata font-medium">
                  40.000
                  <span className="relative ml-2 text-secondary-200">
                    50.000
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
                className={`relative ${itemPopup == 1 ? "z-20" : ""}`}
                onClick={() => setItemPopup(1)}
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
                  itemPopup == 1 ? "" : "pointer-events-none opacity-0"
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
          {/* Item */}
          <div key={2}>
            <div className="flex items-center justify-between">
              <div>
                <Image
                  src="/signup/profile.png"
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div className="grow-[2] px-5">
                <span className="font-literata text-[1.1rem] font-medium">
                  Borgir
                </span>
                <p className="font-literata font-medium">
                  40.000
                  <span className="relative ml-2 text-secondary-200">
                    50.000
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
                className={`relative ${itemPopup == 2 ? "z-20" : ""}`}
                onClick={() => setItemPopup(2)}
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
                  itemPopup == 2 ? "" : "pointer-events-none opacity-0"
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
        </div>
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
