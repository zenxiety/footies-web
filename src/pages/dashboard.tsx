import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import General from "../components/dashboard/General";
import Menu from "../components/dashboard/Menu";
import SaldoPoin from "../components/dashboard/SaldoPoin";
import TipeAkun from "../components/dashboard/TipeAkun";

export default function Dashboard() {
  const [roles, setRoles] = useState<Role>("USER");

  return (
    <>
      <Head>
        <title>Dashboard - Footies</title>
      </Head>
      <section className="min-h-screen bg-secondary-500 pt-[2.5vh] font-louis">
        {/* Back Button / Page Title */}
        <div className={`${roles != "MITRA" ? "px-8" : ""}`}>
          <div
            className={`flex items-center ${roles == "MITRA" ? "px-8" : ""}`}
          >
            <Link href="/">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.875 19.3L4.27502 12.7C4.17502 12.6 4.10402 12.4917 4.06202 12.375C4.02002 12.2583 3.99935 12.1333 4.00002 12C4.00002 11.8667 4.02102 11.7417 4.06302 11.625C4.10502 11.5083 4.17568 11.4 4.27502 11.3L10.875 4.7C11.0583 4.51667 11.2877 4.421 11.563 4.413C11.8383 4.405 12.0757 4.50067 12.275 4.7C12.475 4.88333 12.5793 5.11267 12.588 5.388C12.5967 5.66333 12.5007 5.90067 12.3 6.1L7.40002 11H18.575C18.8583 11 19.096 11.096 19.288 11.288C19.48 11.48 19.5757 11.7173 19.575 12C19.575 12.2833 19.4793 12.521 19.288 12.713C19.0967 12.905 18.859 13.0007 18.575 13H7.40002L12.3 17.9C12.4833 18.0833 12.5793 18.3167 12.588 18.6C12.5967 18.8833 12.5007 19.1167 12.3 19.3C12.1167 19.5 11.8833 19.6 11.6 19.6C11.3167 19.6 11.075 19.5 10.875 19.3Z"
                  fill="#D3D3D3"
                />
              </svg>
            </Link>
            <span className="ml-3 text-others-white">Akun Saya</span>
          </div>
          {/* User Profile */}
          <div
            className={`mt-[2.5vh] flex items-center justify-between ${
              roles == "MITRA" ? "px-8" : ""
            }`}
          >
            <div className="flex items-center">
              {/* User Icon */}
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 16C30.0222 16 28.0888 16.5865 26.4443 17.6853C24.7998 18.7841 23.5181 20.3459 22.7612 22.1732C22.0043 24.0004 21.8063 26.0111 22.1922 27.9509C22.578 29.8907 23.5304 31.6725 24.9289 33.0711C26.3275 34.4696 28.1093 35.422 30.0491 35.8079C31.9889 36.1937 33.9996 35.9957 35.8268 35.2388C37.6541 34.4819 39.2159 33.2002 40.3147 31.5557C41.4135 29.9112 42 27.9778 42 26C42 23.3478 40.9464 20.8043 39.0711 18.9289C37.1957 17.0536 34.6522 16 32 16Z"
                  fill="#EAEAEA"
                />
                <path
                  d="M32 4C26.4621 4 21.0486 5.64217 16.444 8.71885C11.8395 11.7955 8.25064 16.1685 6.13139 21.2849C4.01213 26.4012 3.45764 32.0311 4.53802 37.4625C5.61841 42.894 8.28515 47.8831 12.201 51.799C16.1169 55.7149 21.106 58.3816 26.5375 59.462C31.969 60.5424 37.5988 59.9879 42.7151 57.8686C47.8315 55.7494 52.2045 52.1605 55.2812 47.556C58.3578 42.9514 60 37.5379 60 32C59.9915 24.5765 57.0388 17.4595 51.7896 12.2104C46.5405 6.96118 39.4235 4.00847 32 4ZM47.984 49.852C47.9442 47.2287 46.8753 44.726 45.0078 42.8832C43.1403 41.0404 40.6236 40.0049 38 40H26C23.3764 40.0049 20.8597 41.0404 18.9922 42.8832C17.1247 44.726 16.0559 47.2287 16.016 49.852C12.3891 46.6135 9.83147 42.3497 8.68168 37.6253C7.53189 32.9009 7.84421 27.9387 9.57729 23.3957C11.3104 18.8527 14.3825 14.9433 18.3868 12.1851C22.3911 9.42693 27.1387 7.95005 32.001 7.95005C36.8633 7.95005 41.611 9.42693 45.6153 12.1851C49.6196 14.9433 52.6917 18.8527 54.4247 23.3957C56.1578 27.9387 56.4701 32.9009 55.3203 37.6253C54.1706 42.3497 51.6109 46.6135 47.984 49.852Z"
                  fill="#EAEAEA"
                />
              </svg>
              {/* User Profile Detail */}
              <div className="ml-2 text-[14px] leading-tight text-others-white">
                <p className="font-medium text-primary-300">
                  Raden Bagus Putra
                </p>
                {roles == "MITRA" ? (
                  <>
                    <div className="mt-1 flex flex-col items-center justify-center rounded-sm border bg-secondary-400 px-3 py-1">
                      <span className="text-[18px]">B 1234 CDE</span>
                      <p className="text-[0.5rem]">2019</p>
                    </div>
                  </>
                ) : (
                  <p>(+62) 812-3456-7890</p>
                )}
                {roles == "USER" ? (
                  <p>john.doe@gmail.com</p>
                ) : roles == "MERCHANT" ? (
                  <div className="mt-1 flex w-[48vw] max-w-[240px] cursor-pointer items-center justify-between rounded-md bg-primary-300 px-2 py-1">
                    <p className="w-36 overflow-hidden text-ellipsis whitespace-nowrap text-others-black">
                      Jl. Sendiri Mululuululluluululul
                    </p>
                    <svg
                      width={12}
                      height={14}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 7c.367 0 .68-.13.942-.392.261-.261.392-.575.391-.941 0-.367-.13-.681-.392-.942A1.281 1.281 0 006 4.333c-.367 0-.68.131-.942.392a1.281 1.281 0 00-.391.942c0 .366.13.68.392.942.26.261.575.391.94.391zm0 6.417a.797.797 0 01-.5-.183C3.878 11.8 2.667 10.468 1.867 9.24c-.8-1.228-1.2-2.375-1.2-3.441 0-1.667.536-2.994 1.608-3.983C3.348.827 4.59.333 6 .333c1.41 0 2.653.495 3.725 1.484 1.073.989 1.609 2.316 1.608 3.983 0 1.067-.4 2.214-1.2 3.442-.8 1.228-2.01 2.558-3.633 3.991a.798.798 0 01-.5.184z"
                        fill="#1D1D1D"
                      />
                    </svg>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {/* Edit Button */}
            <div className="group cursor-pointer">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="34.0024"
                  height="34.0024"
                  rx="17.0012"
                  className="fill-current text-secondary-500 duration-500 group-active:text-primary-300"
                />
                <path
                  d="M8 22.2524V26.0024H11.75L22.81 14.9424L19.06 11.1924L8 22.2524ZM25.71 10.6324L23.37 8.29244C23.2775 8.19974 23.1676 8.12619 23.0466 8.07601C22.9257 8.02583 22.796 8 22.665 8C22.534 8 22.4043 8.02583 22.2834 8.07601C22.1624 8.12619 22.0525 8.19974 21.96 8.29244L20.13 10.1224L23.88 13.8724L25.71 12.0424C25.8027 11.9499 25.8762 11.84 25.9264 11.7191C25.9766 11.5981 26.0024 11.4684 26.0024 11.3374C26.0024 11.2065 25.9766 11.0768 25.9264 10.9558C25.8762 10.8348 25.8027 10.725 25.71 10.6324Z"
                  className="fill-current text-others-white duration-500 group-active:text-secondary-500"
                />
              </svg>
            </div>
          </div>
          {roles == "MITRA" ? (
            <>
              <div className=" relative mt-4 grid grid-cols-2 gap-x-8 border-y border-primary-300 bg-others-black py-2 text-others-white">
                <div className="place-self-end">XXXX</div>
                <div className="">XXXX</div>
                <div className="absolute top-1/2 left-1/2 h-1/2 w-[1px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-others-white"></div>
              </div>
            </>
          ) : (
            <></>
          )}
          <TipeAkun roles={roles} setRoles={setRoles} />
          <SaldoPoin roles={roles} />
        </div>
        <Menu roles={roles} />
        <General roles={roles} />
        <footer className="grid py-4">
          <span className="text-center text-[14px] text-others-white">
            v1.6.9
          </span>
        </footer>
      </section>
    </>
  );
}
