import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { Merchant, Mitra, User } from "@prisma/client";
import FormProvider from "../../../context/FormContext";
import { Controller, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../../utils/cloudinary";
import Foto from "../../../components/Forms/driver/Foto";
import SIM from "../../../components/Forms/driver/SIM";
import Steps from "../../../components/Forms/Steps";
import Nav from "../../../components/Forms/Nav";
import STNK from "../../../components/Forms/driver/STNK";
import Motor from "../../../components/Forms/driver/Motor";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import superjson from "superjson";
import { createTRPCContext } from "../../../server/api/trpc";
import Head from "next/head";
import Verifikasi from "../../../components/Forms/Verifikasi";

export type DriverFormValues = {
  profilePicture: string;
  sim: string;
  stnk: string;
  platNomor: string;
  merk: string;
  tipeKendaraan: string;
  tahunProduksi: string;
};

export async function getServerSideProps(ctx: CreateNextContextOptions) {
  // const ssg = await ssgHelpers(ctx);
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createTRPCContext(ctx),
    transformer: superjson,
  });
  const data = await ssg.auth.checkRegister.fetch();
  console.log(data);
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

export default function Driver(props: {
  data:
    | (User & {
        Merchant: Merchant | null;
        Mitra: Mitra | null;
      })
    | null;
}) {
  const [page, setPage] = useState(props.data?.Mitra ? 5 : 0);

  const title = ["Sudah Siap Mengantar?", "5", "pengemudi"];
  const steps = [
    "Unggah foto Anda sebagai pengemudi.",
    "Unggah foto Surat Izin Mengemudi (SIM) Anda.",
    "Unggah foto Surat Tanda Nomor Kendaraan (STNK) Anda.",
    "Tulis Pelat Nomor Kendaraan dan tipe kendaraan Anda.",
    "Tunggu dokumenmu diverifikasi.",
    "Selamat! Anda sudah bisa mengantar makanan Footies!",
  ];

  const prevFormStep = () => {
    setPage((page) => page - 1);
  };

  const nextFormStep = () => {
    setPage((page) => page + 1);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DriverFormValues>({ mode: "all" });

  return (
    <>
      <Head>
        <title>Registrasi Mitra - Footies</title>
      </Head>
      <div className="relative flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-secondary-500 font-louis">
        {/* close button */}
        <div className="absolute top-6 left-6 z-[100]">
          <Link href="/dashboard">
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
        <Steps page={page} setPage={setPage} title={title} steps={steps} />
        <div
          className={`z-20 flex justify-start overflow-hidden text-center font-literata text-2xl font-semibold leading-tight text-primary-300 duration-500`}
        >
          <div
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            // onSubmit={handleSubmit(submitHandler)}
            className={`${
              page !== 5
                ? "relative z-10 flex overflow-hidden duration-1000 xs:gap-x-[calc((100vw-500px))] xs:px-[calc((100vw-500px)/2)]"
                : "hidden"
            } ${
              page == 1
                ? "translate-x-[50%] "
                : page == 2
                ? "translate-x-[25%] "
                : page == 3
                ? "translate-x-[0%] "
                : page == 4
                ? "-translate-x-[25%] "
                : "translate-x-[50%] -translate-y-full "
            }`}
          >
            <svg
              width={1194}
              height={321}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 -left-[10%]"
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
              className="absolute -top-[10%] -right-[6%]"
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
            <FormProvider<DriverFormValues>>
              <Foto
                prevFormStep={prevFormStep}
                formStep={page}
                nextFormStep={nextFormStep}
              />
              <SIM
                prevFormStep={prevFormStep}
                formStep={page}
                nextFormStep={nextFormStep}
              />
              <STNK
                prevFormStep={prevFormStep}
                formStep={page}
                nextFormStep={nextFormStep}
              />
              <Motor
                prevFormStep={prevFormStep}
                formStep={page}
                nextFormStep={nextFormStep}
              />
            </FormProvider>
          </div>
          <Verifikasi page={page} />
        </div>
        <div
          className={`pointer-events-none absolute bottom-7 flex items-center delay-300 duration-1000 ${
            page != 0 && page != 5 ? "" : "translate-y-[100%]"
          }`}
        >
          <svg
            width={28}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer "
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
          {/* ini progress barnya */}
          <div className="relative mx-4 flex h-2 w-48 justify-between overflow-hidden">
            <div className="h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
            <div className="z-10 h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
            <div className="z-10 h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
            <div className="z-10 h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
            <div className="h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
            <div
              className={`absolute h-full w-full border border-primary-300 bg-primary-300 duration-1000 ${
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
          </div>
          <svg
            width={28}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180 cursor-pointer"
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
        <Link href="/dashboard" className={`${page == 5 ? "" : "hidden"}`}>
          <div className="mx-auto mb-7">
            <span className="rounded-full bg-primary-300 px-4 py-2 font-bold text-secondary-500">
              Kembali
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
