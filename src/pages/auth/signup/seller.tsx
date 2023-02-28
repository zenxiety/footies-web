import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Map = dynamic(() => import("../../../components/Map"), { ssr: false });

export default function Seller() {
  const [page, setPage] = useState(0);
  const steps = [
    "Isi informasi tentang tokomu mulai dari nama dan deskripsi tokomu.",
    "Atur alamat lokasi tokomu.",
    "Tentukan jam toko buka dan tutup serta label tentang tokomu.",
    "Unggah dokumen yang diperlukan untuk menjadi Penjual Footies.",
    "Tunggu dokumenmu diverifikasi.",
    "Selamat! Jejakmu sudah tertinggal di aplikasi Footies",
  ];
  const labels = ["Chinese", "Chinese", "Chinese", "Kids", "BBC", "Chinese"];

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-secondary-500 font-louis">
        <div className="absolute top-6 left-6">
          <Link href="/">
            <svg
              width={17}
              height={17}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y={1.414}
                width={2}
                height={21}
                rx={1}
                transform="rotate(-45 0 1.414)"
                fill="#EFEFEF"
              />
              <rect
                x={14.849}
                width={2}
                height={21}
                rx={1}
                transform="rotate(45 14.85 0)"
                fill="#EFEFEF"
              />
            </svg>
          </Link>
        </div>
        {page == 0 ? (
          <div className="flex h-screen w-full flex-col justify-between pt-24">
            <div className="px-8">
              <div>
                <span className="font-literata text-2xl font-semibold text-primary-300">
                  Let&apos;s Get Started!
                </span>
                <p className="text-others-white">
                  Kamu hanya perlu 4 cara untuk menjadi penjual di aplikasi
                  Footies!
                </p>
              </div>
              <div className="mt-8">
                {steps.map((step, i) => (
                  <div className="mb-5 flex items-center" key={i}>
                    <div className="relative mr-3 w-11">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-300 font-literata text-2xl font-semibold text-secondary-500">
                        {i != 5 ? (
                          i + 1
                        ) : (
                          <svg
                            width={20}
                            height={15}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.081 15L0 7.919l2.253-2.254 4.828 4.828L17.576 0l2.26 2.245L7.08 15z"
                              fill="#1A1A1A"
                            />
                          </svg>
                        )}
                        <div
                          className={`absolute top-3/4 h-10 w-1 bg-primary-300 ${
                            i == 5 ? "hidden" : ""
                          }`}
                        />
                      </span>
                    </div>
                    <p className="text-[14px] leading-snug text-others-white">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setPage(1)}
              className="mx-8 mb-10 rounded-md bg-primary-300 py-3 font-louis text-[14px] font-bold"
            >
              Daftar Sekarang
            </button>
          </div>
        ) : (
          <div
            className={`relative mt-20 flex justify-start text-center font-literata text-2xl font-semibold leading-tight text-primary-300 duration-500
          ${
            page == 1
              ? "translate-x-[40%]"
              : page == 2
              ? "translate-x-[20%]"
              : page == 4
              ? "-translate-x-[20%]"
              : page == 5
              ? "-translate-x-[40%]"
              : ""
          }`}
          >
            <svg
              width={1194}
              height={321}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 -left-14"
            >
              <g filter="url(#prefix__filter0_f_583_1124)">
                <path
                  d="M1131.5 72c-4.37 2.145-10.61 4.638-18.36 7.357L882 172l-104.5 26.5-161 28.5L397 259C267 229.4 119.5 115.333 62 62c76 56.667 248.4 170 330 170s179.333-28.667 218-43c52.167-26.833 152.258-66.204 239.5-62 72.924 3.514 207.6-27.966 263.64-47.643L1131.5 72z"
                  fill="url(#prefix__paint0_linear_583_1124)"
                />
              </g>
              <defs>
                <linearGradient
                  id="prefix__paint0_linear_583_1124"
                  x1={547.5}
                  y1={233.5}
                  x2={972.5}
                  y2={26.5}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F4B90B" />
                  <stop offset={1} stopColor="#F4B90B" stopOpacity={0} />
                </linearGradient>
                <filter
                  id="prefix__filter0_f_583_1124"
                  x={0}
                  y={0}
                  width={1193.5}
                  height={321}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation={31}
                    result="effect1_foregroundBlur_583_1124"
                  />
                </filter>
              </defs>
            </svg>
            <svg
              width={569}
              height={427}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -top-24 right-64"
            >
              <g filter="url(#prefix__filter0_f_583_1125)">
                <path
                  d="M430.5 191.5l44.5-58V93l31.5-31-17 97-45 184.5-290-13-92.5 34 114.5-137 74 23 180-59z"
                  fill="#F4B90B"
                />
              </g>
              <defs>
                <filter
                  id="prefix__filter0_f_583_1125"
                  x={0}
                  y={0}
                  width={568.5}
                  height={426.5}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation={31}
                    result="effect1_foregroundBlur_583_1125"
                  />
                </filter>
              </defs>
            </svg>
            {/* 1) Informasi Toko */}
            <div className="z-10 w-screen">
              <p>Informasi</p>
              <p>Toko</p>
              <div className="mt-5 flex w-full justify-center">
                <Image src="/signup/info.png" alt="" width={300} height={210} />
              </div>
              <form action="">
                <p className="ml-9 mt-6 mr-auto text-start text-sm text-secondary-100">
                  Nama Toko <span className="text-failed">*</span>
                </p>
                <input
                  type="text"
                  className="w-[80%] border-b border-secondary-100 bg-transparent py-1 font-louis text-[14px] font-light text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
                />
              </form>
              <form action="">
                <p className="ml-9 mt-6 mr-auto text-start text-sm text-secondary-100">
                  Deskripsi Toko
                </p>
                <textarea className="w-[80%] border-b border-secondary-100 bg-transparent py-1 font-louis text-[14px] font-light text-others-white duration-500 focus:h-[100px] focus:border-b focus:border-others-white focus:outline-none" />
              </form>
            </div>
            {/* 2) Alamat Toko */}
            <div className="z-10 w-screen">
              <p>Alamat toko</p>
              <div className="mt-5 h-full w-full">
                <Map />
                <form action="">
                  <p className="ml-8 mt-6 mb-1 mr-auto text-start text-sm text-secondary-100">
                    Alamat Toko <span className="text-failed">*</span>
                  </p>
                  <input
                    type="text"
                    className="w-[82%] border-b border-secondary-100 bg-transparent py-1 font-louis text-[14px] font-light text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
                  />
                </form>
              </div>
            </div>
            {/* 3) Detail Toko */}
            <div className="z-10 w-screen">
              <div className="flex flex-col justify-between">
                <p>Detail Toko</p>
                <form action="" className="mx-auto mt-12 w-1/3">
                  <p className="mb-1 text-[15px] text-others-white">Jam Buka</p>
                  <div className="relative flex gap-x-6">
                    <input
                      type="number"
                      className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
                    />
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] text-others-white">
                      :
                    </p>
                    <input
                      type="number"
                      className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
                    />
                  </div>
                  <p className="mt-7 mb-1 text-[15px] text-others-white">
                    Jam Tutup
                  </p>
                  <div className="relative flex gap-x-6">
                    <input
                      type="number"
                      className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
                    />
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] text-others-white">
                      :
                    </p>
                    <input
                      type="number"
                      className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
                    />
                  </div>
                  <p className="mt-7 text-[15px] text-others-white">Label</p>
                  <input
                    type="text"
                    className="w-2/3 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
                  />
                </form>
              </div>
              <div className="ml-5 mt-5 flex flex-wrap gap-2">
                {labels.map((label, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-x-3 bg-primary-300 px-2 py-1 font-louis text-base text-secondary-500"
                  >
                    <p>{label}</p>
                    <button>
                      <svg
                        width={14}
                        height={13}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width={1.563}
                          height={16.417}
                          rx={0.782}
                          transform="rotate(-44.936 2.007 -.566)"
                          fill="#1A1A1A"
                        />
                        <rect
                          width={1.563}
                          height={16.417}
                          rx={0.782}
                          transform="rotate(44.936 6.125 15.317)"
                          fill="#1A1A1A"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* 4) Dokumen */}
            <div className="z-10 w-screen">
              <p className="mb-5">Verifikasi Dokumen</p>
              <div className="mx-8">
                <div>
                  <Image
                    src="/signup/dokumen.png"
                    alt=""
                    width={150}
                    height={85}
                    className=" w-full rounded-md border-[5px] border-primary-300"
                  />
                </div>
                <div className="">
                  <p className="mt-10 mb-1 mr-auto text-start text-[15px] font-medium  text-others-white">
                    Unggah Dokumen <span className="text-failed">*</span>
                  </p>
                  <p className="mb-1 mr-auto text-start font-louis text-[12px] font-medium  text-others-white">
                    Dokumen kepemilikan bisnis/bangunan
                  </p>
                  <div className="mt-3 flex h-[200px] w-[300px] flex-col items-center justify-center rounded-md border border-dashed">
                    <svg
                      width={41}
                      height={33}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.613 27.471a5 5 0 01-5 5h-3.325c-2.806 0-5.204-1.05-7.193-3.15-1.99-2.1-2.983-4.666-2.982-7.7 0-2.6.724-4.916 2.174-6.95 1.449-2.033 3.345-3.333 5.688-3.9.771-3.066 2.313-5.55 4.625-7.45 2.313-1.9 4.934-2.85 7.863-2.85 3.607 0 6.668 1.359 9.181 4.076 2.514 2.718 3.77 6.026 3.769 9.924 2.127.267 3.893 1.259 5.296 2.976 1.404 1.718 2.105 3.726 2.104 6.024 0 2.5-.81 4.626-2.43 6.376-1.619 1.751-3.584 2.626-5.895 2.624h-5.175a5 5 0 01-5-5v-9.3l2.96 3.1 2.59-2.8-7.4-8-7.4 8 2.59 2.8 2.96-3.1v9.3z"
                        fill="#EFEFEF"
                      />
                    </svg>
                    <button className="mt-2 rounded-full bg-primary-300 px-4 py-[6px] font-louis text-[14px] font-bold text-secondary-500">
                      Telusuri
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* 5) Verifikasi */}
            <div className="z-10 flex w-screen flex-col items-center justify-between">
              <p className="px-20">Sedang Dalam Proses Verifikasi</p>
              <div className="relative w-fit">
                <svg
                  width={86}
                  height={110}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <path
                    d="M81.593 46.842v47.242a11.645 11.645 0 01-11.644 11.644H15.61A11.646 11.646 0 013.967 94.084V16.458A11.644 11.644 0 0115.61 4.814h23.955c2.058 0 4.031.818 5.487 2.273L79.32 41.354a7.763 7.763 0 012.273 5.488z"
                    stroke="#F6C73B"
                    strokeWidth={7.763}
                    strokeLinejoin="round"
                  />
                  <path
                    d="M42.78 6.755v29.11a7.763 7.763 0 007.762 7.762h29.11M23.373 63.034h38.813M23.373 82.44h38.813"
                    stroke="#F6C73B"
                    strokeWidth={7.763}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Image
                  src="/signup/load.png"
                  alt=""
                  width={200}
                  height={200}
                  className="animate-spin-fast"
                />
              </div>
              <div />
            </div>
          </div>
        )}
        <div
          className={`z-10 mb-7 flex items-center gap-x-4 ${
            page == 0 ? "hidden" : ""
          }`}
        >
          {/* Navigation button */}
          {page != 0 ? (
            <button onClick={() => setPage(page - 1)} className="">
              <svg
                width={28}
                height={28}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width={28}
                  height={28}
                  rx={14}
                  transform="matrix(-1 0 0 1 28 0)"
                  fill="#F6C73B"
                />
                <path
                  d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
                  fill="#1D1D1D"
                />
              </svg>
            </button>
          ) : (
            <>
              <button className="pointer-events-none">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width={28}
                    height={28}
                    rx={14}
                    transform="matrix(-1 0 0 1 28 0)"
                    fill="#1a1a1a"
                  />
                  <path
                    d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
                    fill="#1a1a1a"
                  />
                </svg>
              </button>
            </>
          )}
          {page != 5 ? (
            // Progess Bar
            <div className="relative flex h-2 w-48 justify-between overflow-hidden bg-secondary-400">
              <>
                <div className="h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
                <div className="z-10 h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
                <div className="z-10 h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
                <div className="z-10 h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
                <div className="h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
                <div
                  className={`absolute h-full w-full border border-primary-300 bg-primary-300 duration-500 ${
                    page == 0
                      ? "-translate-x-48"
                      : page == 1
                      ? "-translate-x-36"
                      : page == 2
                      ? "-translate-x-24"
                      : page == 3
                      ? "-translate-x-12"
                      : ""
                  }`}
                />
              </>
            </div>
          ) : (
            <>
              <Link href="/dashboard">
                <div className="mx-auto">
                  <span className="rounded-full bg-primary-300 px-4 py-2 font-bold text-secondary-500">
                    Kembali
                  </span>
                </div>
              </Link>
            </>
          )}
          {page != 5 ? (
            <button onClick={() => setPage(page + 1)} className="rotate-180">
              <svg
                width={28}
                height={28}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width={28}
                  height={28}
                  rx={14}
                  transform="matrix(-1 0 0 1 28 0)"
                  fill="#F6C73B"
                />
                <path
                  d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
                  fill="#1D1D1D"
                />
              </svg>
            </button>
          ) : (
            <>
              <button className="pointer-events-none">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width={28}
                    height={28}
                    rx={14}
                    transform="matrix(-1 0 0 1 28 0)"
                    fill="#1a1a1a"
                  />
                  <path
                    d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
                    fill="#1a1a1a"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
