import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import data from "../homepage/data.json";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../../server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

const PageTwo = ({
  prevFormStep,
  formStep,
  data,
  setSearchQuery,
  searchQuery,
}: {
  prevFormStep: () => void;
  formStep: number;
  data: RouterOutput["user"]["searchProductandMerchant"] | undefined;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
}) => {
  const router = useRouter();
  // const [searchQuery, setSearchQuery] = useState("");
  // const filteredData = data.filter((item) =>
  //   item.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  // const history = [
  //   {
  //     item: "mixue",
  //   },
  //   {
  //     item: "sabana murah",
  //   },
  //   {
  //     item: "warung santai",
  //   },
  //   {
  //     item: "gacoan",
  //   },
  //   {
  //     item: "morgans kebab",
  //   },
  //   {
  //     item: "warung rata-rata",
  //   },
  //   {
  //     item: "penyetan mas kobis",
  //   },
  // ];
  return (
    <>
      <div className="min-h-screen" hidden={formStep != 1}>
        <div className="relative z-0 h-full w-full rounded-b-xl bg-secondary-300 p-5">
          <input
            className=" w-full rounded-full bg-white py-3 pl-3 pr-12 font-louis"
            placeholder="Mau makan apa hari ini?"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-[7.5%] top-[40%] z-50 scale-[150%]"
            onClick={prevFormStep}
          >
            <rect
              x="3.3335"
              y="4.51221"
              width="1.66667"
              height="17.5"
              rx="0.833333"
              transform="rotate(-45 3.3335 4.51221)"
              fill="#000000"
            />
            <rect
              x="15.708"
              y="3.3335"
              width="1.66667"
              height="17.5"
              rx="0.833333"
              transform="rotate(45 15.708 3.3335)"
              fill="#000000"
            />
          </svg>
        </div>
        {/* <div className="w-full bg-secondary-500 p-5">
          <h1 className="pb-5 font-literata text-2xl text-white">
            Mencari makanan ini?
          </h1>
          <div className="flex flex-row flex-wrap justify-start gap-x-2">
            {history.map(({ item }) => {
              return (
                <div className="my-1 w-fit bg-primary-300 p-1">
                  <h1 className="font-louis">{item}</h1>
                </div>
              );
            })}
          </div>
        </div> */}
        <div className="mx-5 border-t-2 border-secondary-300 pb-5" />
        <div className="w-full bg-secondary-500 p-5">
          <h1 className="pb-5 font-literata text-2xl text-white">
            Restoran yang cocok
          </h1>

          {data?.map((item) => {
            return (
              <>
                <div
                  onClick={async () =>
                    await router.push(`/storepage/${item.id}`)
                  }
                  className="relative flex cursor-pointer flex-row items-center gap-x-2 py-3"
                >
                  <div className="flex flex-col items-center rounded-xl border-2 border-primary-300 bg-failed">
                    <Image
                      src="/assets/burger.png"
                      alt=""
                      height={100}
                      width={150}
                      className="h-[50%] rounded-xl"
                    />
                    <div className="flex w-fit -translate-y-5 flex-row items-center justify-center gap-x-2 rounded-full border-2 border-primary-300 bg-secondary-300 py-1 px-3">
                      <i className="fas fa-star text-primary-300" />
                      <h1 className="font-louis text-white">{item.rating}</h1>
                    </div>
                    <h1 className="pb-1 font-louis text-white">35% off</h1>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h1 className=" font-2xl truncate font-literata text-white">
                      {item.nama}
                    </h1>
                    <h1 className="font-louis font-bold text-secondary-300">
                      <span className="text-white">$</span>$$${" "}
                      <span className="text-white">• {item.labels} </span>
                    </h1>
                    <div className="border-t-2 border-secondary-300" />
                    {/* <h1 className="font-louis text-sm font-bold text-white">
                      {item.jarak} • {item.waktu}{" "}
                    </h1> */}
                    <div className="flex flex-row items-center gap-x-2">
                      <svg
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.51776 1.1157C7.38523 0.980003 7.2269 0.872175 7.05209 0.798556C6.87728 0.724936 6.68952 0.687012 6.49984 0.687012C6.31016 0.687012 6.12239 0.724936 5.94758 0.798556C5.77277 0.872175 5.61445 0.980003 5.48191 1.1157L4.8566 1.75596C4.72211 1.89377 4.56106 2.00285 4.38318 2.07659C4.20531 2.15034 4.01431 2.18721 3.82177 2.18498L2.9267 2.17392C2.73699 2.17166 2.54875 2.20735 2.37305 2.2789C2.19734 2.35046 2.03772 2.45643 1.90357 2.59058C1.76941 2.72473 1.66345 2.88435 1.59189 3.06006C1.52034 3.23576 1.48465 3.42401 1.48691 3.61371L1.49731 4.50878C1.49954 4.70132 1.46267 4.89232 1.38893 5.07019C1.31519 5.24807 1.20611 5.40912 1.0683 5.54361L0.428687 6.16892C0.292991 6.30146 0.185163 6.45978 0.111544 6.63459C0.0379246 6.8094 0 6.99717 0 7.18685C0 7.37653 0.0379246 7.5643 0.111544 7.73911C0.185163 7.91392 0.292991 8.07224 0.428687 8.20478L1.06895 8.83009C1.34716 9.1018 1.50251 9.47621 1.49796 9.86492L1.48691 10.76C1.48465 10.9497 1.52034 11.1379 1.59189 11.3136C1.66345 11.4893 1.76941 11.649 1.90357 11.7831C2.03772 11.9173 2.19734 12.0232 2.37305 12.0948C2.54875 12.1663 2.73699 12.202 2.9267 12.1998L3.82177 12.1894C4.01431 12.1871 4.20531 12.224 4.38318 12.2978C4.56106 12.3715 4.72211 12.4806 4.8566 12.6184L5.48191 13.258C6.04028 13.83 6.9594 13.83 7.51776 13.258L8.14308 12.6177C8.27756 12.4799 8.43862 12.3708 8.6165 12.2971C8.79437 12.2234 8.98536 12.1865 9.17791 12.1887L10.073 12.1998C10.2627 12.202 10.4509 12.1663 10.6266 12.0948C10.8023 12.0232 10.962 11.9173 11.0961 11.7831C11.2303 11.649 11.3362 11.4893 11.4078 11.3136C11.4793 11.1379 11.515 10.9497 11.5128 10.76L11.5024 9.86492C11.5001 9.67237 11.537 9.48138 11.6107 9.30351C11.6845 9.12563 11.7936 8.96458 11.9314 8.83009L12.571 8.20478C13.143 7.64641 13.143 6.72729 12.571 6.16892L11.9307 5.54361C11.7929 5.40912 11.6838 5.24807 11.6101 5.07019C11.5364 4.89232 11.4995 4.70132 11.5017 4.50878L11.5128 3.61371C11.515 3.42401 11.4793 3.23576 11.4078 3.06006C11.3362 2.88435 11.2303 2.72473 11.0961 2.59058C10.962 2.45643 10.8023 2.35046 10.6266 2.2789C10.4509 2.20735 10.2627 2.17166 10.073 2.17392L9.17791 2.18433C8.98536 2.18656 8.79437 2.14969 8.6165 2.07594C8.43862 2.0022 8.27756 1.89312 8.14308 1.75531L7.51776 1.1157ZM4.54979 6.21183C4.67783 6.21183 4.80462 6.18661 4.92291 6.13761C5.04121 6.08861 5.1487 6.01679 5.23924 5.92625C5.32978 5.83571 5.4016 5.72822 5.45059 5.60993C5.49959 5.49163 5.52481 5.36484 5.52481 5.2368C5.52481 5.10876 5.49959 4.98197 5.45059 4.86368C5.4016 4.74538 5.32978 4.63789 5.23924 4.54735C5.1487 4.45682 5.04121 4.385 4.92291 4.336C4.80462 4.287 4.67783 4.26178 4.54979 4.26178C4.2912 4.26178 4.0432 4.3645 3.86034 4.54735C3.67749 4.73021 3.57477 4.97821 3.57477 5.2368C3.57477 5.49539 3.67749 5.7434 3.86034 5.92625C4.0432 6.1091 4.2912 6.21183 4.54979 6.21183ZM8.44989 10.1119C8.70848 10.1119 8.95648 10.0092 9.13933 9.82635C9.32219 9.64349 9.42491 9.39549 9.42491 9.1369C9.42491 8.87831 9.32219 8.6303 9.13933 8.44745C8.95648 8.2646 8.70848 8.16187 8.44989 8.16187C8.19129 8.16187 7.94329 8.2646 7.76044 8.44745C7.57759 8.6303 7.47486 8.87831 7.47486 9.1369C7.47486 9.39549 7.57759 9.64349 7.76044 9.82635C7.94329 10.0092 8.19129 10.1119 8.44989 10.1119ZM8.9556 4.73109C9.02203 4.79749 9.07473 4.87633 9.11068 4.9631C9.14664 5.04987 9.16514 5.14288 9.16514 5.2368C9.16514 5.33073 9.14664 5.42373 9.11068 5.5105C9.07473 5.59728 9.02203 5.67611 8.9556 5.74251L5.0555 9.64261C4.92138 9.77673 4.73947 9.85208 4.54979 9.85208C4.36011 9.85208 4.1782 9.77673 4.04408 9.64261C3.90995 9.50849 3.8346 9.32658 3.8346 9.1369C3.8346 8.94722 3.90995 8.76531 4.04408 8.63119L7.94417 4.73109C8.01057 4.66466 8.08941 4.61196 8.17618 4.57601C8.26296 4.54005 8.35596 4.52155 8.44989 4.52155C8.54381 4.52155 8.63682 4.54005 8.72359 4.57601C8.81036 4.61196 8.8892 4.66466 8.9556 4.73109Z"
                          fill="#F51C2F"
                        />
                      </svg>
                      <h1 className="font-louis font-light text-white">
                        35% off up to 15k
                      </h1>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PageTwo;
