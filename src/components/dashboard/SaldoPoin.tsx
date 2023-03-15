import { Role } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { useEffect } from "react";
import { AppRouter } from "../../server/api/root";
import { api } from "../../utils/api";

type RouterOutput = inferRouterOutputs<AppRouter>;

export default function SaldoPoin({
  roles,
  userData,
  merchantData,
  mitraData,
}: {
  roles: Role;
  userData: RouterOutput["user"]["getUserProfile"];
  merchantData: RouterOutput["user"]["getMerchantProfile"];
  mitraData: RouterOutput["user"]["getMitraProfile"];
}) {
  return (
    <>
      <div
        className={`${
          roles == "MITRA" ? "px-8" : ""
        } mt-[2.5vh] text-secondary-500`}
      >
        <span className="font-literata text-[15px] font-medium text-primary-300">
          {roles == "USER" ? "Saldo & Poin" : "Saldo"}
        </span>
        <div className={`relative mt-[1vh]`}>
          {roles == "USER" ? (
            // Pembeli
            <div className="grid grid-cols-2 rounded-md bg-primary-300 px-4 pb-3 pt-4">
              <div className="flex flex-col items-start">
                <svg
                  width={16}
                  height={16}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.158 12.632v.842a1.684 1.684 0 01-1.684 1.684H1.684A1.684 1.684 0 010 13.474V1.684A1.684 1.684 0 011.684 0h11.79a1.684 1.684 0 011.684 1.684v.842H7.579a1.684 1.684 0 00-1.684 1.685v6.736a1.684 1.684 0 001.684 1.685m0-1.685H16V4.211H7.579m3.368 4.631a1.263 1.263 0 110-2.526 1.263 1.263 0 010 2.526z"
                    fill="#1F1F1F"
                  />
                </svg>
                <div className="mt-1 font-literata text-[10px] font-light leading-none">
                  Domfeet
                </div>
                <span className="text-[14px] font-bold">
                  Rp{userData?.saldo}
                </span>
              </div>
              <div className="absolute top-1/2 left-1/2 h-3/4 w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-500"></div>
              <div className="ml-3 flex flex-col items-start">
                <svg
                  width={21}
                  height={15}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.313 0c5.695 0 10.312 2.518 10.312 5.625v3.75c0 3.107-4.617 5.625-10.313 5.625C4.718 15 .165 12.57.005 9.54L0 9.376v-3.75C0 2.518 4.617 0 10.313 0zm0 11.25c-3.488 0-6.572-.944-8.438-2.39v.515c0 1.764 3.64 3.75 8.438 3.75 4.696 0 8.285-1.903 8.432-3.64l.005-.11v-.516c-1.865 1.446-4.95 2.391-8.438 2.391zm0-9.375c-4.798 0-8.438 1.986-8.438 3.75s3.64 3.75 8.438 3.75c4.797 0 8.437-1.986 8.437-3.75s-3.64-3.75-8.438-3.75z"
                    fill="#1F1F1F"
                  />
                </svg>

                <div className="mt-1 font-literata text-[10px] font-light leading-none">
                  Footies Points
                </div>
                <span className="text-[14px] font-bold">Rp169.069</span>
              </div>
            </div>
          ) : (
            // Penjual
            <>
              <div className="flex items-center justify-between rounded-md bg-primary-300 px-4 py-2">
                <div className="flex items-center">
                  <svg
                    width={37}
                    height={35}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34.605 28.42v1.896a3.79 3.79 0 01-3.79 3.789H4.29A3.79 3.79 0 01.5 30.315V3.79A3.79 3.79 0 014.29 0h26.526a3.79 3.79 0 013.79 3.79v1.894H17.552a3.79 3.79 0 00-3.79 3.79V24.63a3.79 3.79 0 003.79 3.79m0-3.79H36.5V9.474H17.553m7.579 10.42a2.842 2.842 0 110-5.684 2.842 2.842 0 010 5.685z"
                      fill="#1D1D1D"
                    />
                  </svg>
                  <span className="ml-2 mb-[2px] font-literata text-[14px] font-medium">
                    {roles == "MITRA" ? "Driver Feet" : "Domfeet"}
                  </span>
                </div>
                <p className="font-bold">
                  Rp
                  {roles == "MERCHANT"
                    ? merchantData?.Merchant?.saldo
                    : mitraData?.Mitra?.saldo}
                </p>
              </div>
              {roles == "MERCHANT" ? (
                <button className="mt-4 block w-full rounded-md border border-primary-300 py-3 font-louis text-[12px] text-primary-300">
                  Analisis Toko &gt;
                </button>
              ) : (
                <button className="mt-4 block w-full rounded-md border border-primary-300 py-3 font-louis text-[12px] text-primary-300">
                  Analisis Pengemudi &gt;
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
