import Image from "next/image";
import { useEffect, useState } from "react";
import type { Merchant, Mitra, User } from "@prisma/client";
import Detail from "../components/welcome/Second";
import Vector from "../../public/assets/Vector.png";
import logo from "../../assets/logo-orange.png";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/require-await

export default function Seller(props: {
  data:
    | (User & {
        Merchant: Merchant | null;
        Mitra: Mitra | null;
      })
    | null;
}) {
  const [page, setPage] = useState(props.data?.Merchant ? 5 : 0);
  // console.log(page)
  const nextFormStep = () => {
    setPage((page) => page + 1);
  };

  const prevFormStep = () => {
    setPage((page) => page - 1);
  };

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    // buat ngilangin hydration error things
    setDomLoaded(true);
  }, []);

  return (
    <>
      <motion.div
        initial={{ scale: 1, filter: 'grayscale(100%)'}}
        animate={{ scale: 1, filter: 'grayscale(0%)'}}
        exit={{ filter: 'grayscale(100%)'}}
        transition={{ duration: 6 }}
      >
        <Image
          src={logo}
          width={500}
          alt=""
          className="absolute z-50 translate-y-[30%]"
        />
      </motion.div>

      {domLoaded && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 7 }}
        >
          <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-secondary-500 font-louis">
            <div
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              // onSubmit={handleSubmit(submitHandler)}
              className={`${
                page == 0
                  ? "-translate-x-full duration-1000"
                  : "relative z-50 translate-x-0 duration-1000"
              } ${page == 1 ? "" : "relative z-50 translate-x-full"}`}
            >
              <Detail
                prevFormStep={prevFormStep}
                formStep={page}
                nextFormStep={nextFormStep}
              />
            </div>
            <div
              className={`absolute inset-0 z-0 flex flex-col bg-secondary-500 pt-16 duration-1000 ${
                page == 0 ? "" : "-translate-x-full"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 8 }}
              >
                <Image
                  src={Vector}
                  alt="vector"
                  className="absolute top-[30%] -right-[400px] z-0 scale-[250%]"
                  width={700}
                  height={700}
                />
              </motion.div>

              <Image
                src={logo}
                alt="vector"
                className="relative z-50 mx-auto block w-2/3 py-0"
              />
              <p className="mx-5 pt-24 font-literata text-4xl uppercase text-white relative z-0">
                footies
              </p>
              <p className="text-md mx-5 pt-4 font-louis text-white relative z-0">
                Solusi untuk masalah makanan, minuman, dan transaksi yang
                fleksibel dan efisien melalui tahapan sederhana
              </p>
            </div>
          </div>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 8 }}
      >
        <div className="absolute bottom-8 left-[50%] z-50 flex translate-x-[-50%] flex-row items-center justify-center pb-8">
          <svg
            width={28}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={() => setPage(0)}
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
          <div className="relative mx-4 flex h-2 w-48 justify-center gap-x-12 overflow-hidden">
            <div
              className={`rounded-full duration-1000 ${
                page == 0 ? "w-8 bg-primary-300" : "w-2 bg-secondary-100"
              }`}
            />
            <div
              className={`rounded-full duration-1000 ${
                page == 1 ? "w-8 bg-primary-300" : "w-2 bg-secondary-100"
              }`}
            />
          </div>
          <svg
            width={28}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180 cursor-pointer"
            onClick={() => setPage(1)}
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
        </div>
      </motion.div>
    </>
  );
}
