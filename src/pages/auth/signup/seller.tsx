import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import { api } from "../../../utils/api";
import superjson from "superjson";
import type { Merchant, Mitra, User } from "@prisma/client";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import Info from "../../../components/Forms/seller/Info";
import { Alamat } from "../../../components/Forms/seller";
import Detail from "../../../components/Forms/seller/Detail";
import Dokumen from "../../../components/Forms/seller/Dokumen";
import FormProvider from "../../../context/seller";

const Map = dynamic(() => import("../../../components/Map"), { ssr: false });

type FormValues = {
  nama: string;
  alamat: string;
  jamBuka: string;
  jamTutup: string;
  deskripsi?: string;
  labels: string[];
  dokumen: string;
  apiError?: string;
};

// // eslint-disable-next-line @typescript-eslint/require-await
// export async function getServerSideProps(ctx: CreateNextContextOptions) {
//   // const ssg = await ssgHelpers(ctx);
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createTRPCContext(ctx),
//     transformer: superjson,
//   });
//   const data = await ssg.auth.checkRegister.fetch();
//   return {
//     props: {
//       data,
//     }, // will be passed to the page component as props
//   };
// }

export default function Seller(props: {
  data:
    | (User & {
        Merchant: Merchant | null;
        Mitra: Mitra | null;
      })
    | null;
}) {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [page, setPage] = useState(props.data?.Merchant ? 5 : 0);
  console.log(page);

  const steps = [
    "Isi informasi tentang tokomu mulai dari nama dan deskripsi tokomu.",
    "Atur alamat lokasi tokomu.",
    "Tentukan jam toko buka dan tutup serta label tentang tokomu.",
    "Unggah dokumen yang diperlukan untuk menjadi Penjual Footies.",
    "Tunggu dokumenmu diverifikasi.",
    "Selamat! Jejakmu sudah tertinggal di aplikasi Footies!",
  ];

  const { data: dataUser } = useSession();
  const signUp = api.auth.registerMerchant.useMutation();
  const router = useRouter();

  const submitHandler = async (data: FormValues) => {
    await signUp
      .mutateAsync({
        alamat: data.alamat,
        deskripsi: data.deskripsi,
        dokumen: data.dokumen ?? "anggapinisebagailinkdokumen",
        jamBuka: data.jamBuka,
        jamTutup: data.jamTutup,
        labels: data.labels ?? ["BBC"],
        nama: data.nama,
      })
      .then(async (res) => {
        await router.push("/dashboard");
      })
      .catch((e) => console.log(e));
  };

  const nextFormStep = () => {
    setPage((page) => page + 1);
    // if (page == 1) {
    //   // watch("nama") && setPage((page) => page + 1);
    //   setPage((page) => page + 1);
    // } else if (page == 2) {
    //   // watch("alamat") && setPage((page) => page + 1);
    //   setPage((page) => page + 1);
    // } else if (page == 3) {
    //   // ("jamBuka") &&
    //   //   ("jamTutup") &&
    //   //   // watch("labels") &&
    //   setPage((page) => page + 1);
    // } else if (page == 4) {
    //   // watch("dokumen") && setPage((page) => page + 1);
    // }
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
      {domLoaded && (
        <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-secondary-500 font-louis">
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
          {/* Page 0 */}
          <div
            className={`absolute inset-0 z-50 flex h-screen w-full flex-col justify-between bg-secondary-500 pt-24 duration-1000 ${
              page == 0 ? "" : "-translate-y-full"
            }`}
          >
            <div className="px-8">
              <div>
                <span className="font-literata text-2xl font-semibold text-primary-300">
                  Let&apos;s Get Started!
                </span>
                <p className="text-others-white">
                  Kamu hanya perlu 5 cara untuk menjadi penjual di aplikasi
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
              className="mx-8 mb-10 rounded-md bg-primary-300 py-3 font-louis text-[14px] font-bold duration-500 active:bg-primary-100"
            >
              Daftar Sekarang
            </button>
          </div>
          <div
            className={`relative flex justify-start text-center font-literata text-2xl font-semibold leading-tight text-primary-300 duration-500`}
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
            <div
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              // onSubmit={handleSubmit(submitHandler)}
              className={`${
                page !== 5 ? "z-10 flex duration-1000" : "hidden"
              } ${
                page == 1
                  ? "translate-x-[50%]"
                  : page == 2
                  ? "translate-x-[25%]"
                  : page == 3
                  ? "translate-x-[0%]"
                  : page == 4
                  ? "-translate-x-[25%]"
                  : "translate-x-[50%] -translate-y-full"
              }`}
            >
              <FormProvider>
                {/* 1) Informasi Toko */}
                <Info
                  prevFormStep={prevFormStep}
                  formStep={page}
                  nextFormStep={nextFormStep}
                />
                {/* 2) Alamat Toko */}
                <Alamat
                  prevFormStep={prevFormStep}
                  formStep={page}
                  nextFormStep={nextFormStep}
                />
                {/* 3) Detail Toko */}
                <Detail
                  prevFormStep={prevFormStep}
                  formStep={page}
                  nextFormStep={nextFormStep}
                />
                {/* 4) Dokumen */}
                <Dokumen
                  prevFormStep={prevFormStep}
                  formStep={page}
                  nextFormStep={nextFormStep}
                />
              </FormProvider>
            </div>
            <div className={``}>
              {/* 5) Verifikasi */}
              <div className="z-10 flex w-screen flex-col items-center justify-between">
                <p className="px-20">Sedang Dalam Proses Verifikasi</p>
                <div className="relative mt-20">
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
          </div>
          {page != 5 ? (
            // ini buat navbar yang nempel terus yah bang ihsan
            <div className="absolute bottom-0 z-40 mb-7 flex items-center">
              <button onClick={() => prevFormStep()}>
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden"
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
              {/* <button onClick={() => nextFormStep()}>
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden rotate-180"
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
              </button> */}
              {/* dummy doang biar progress barnya di tengah */}
              <div className="h-[28px]"></div>
            </div>
          ) : (
            <Link href="/dashboard">
              <div className="mx-auto">
                <span className="rounded-full bg-primary-300 px-4 py-2 font-bold text-secondary-500">
                  Kembali
                </span>
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
}

// const Nav = (props) => {
//   return (
//     <>
//   {/* Navigation */}
//   <div
//     className={`z-10 mb-7 flex items-center gap-x-4 delay-500 duration-1000 ${
//       page == 0 ? "translate-y-[500%]" : ""
//     }`}
//   >
//     {/* Navigation button */}
//     {props.data?.Merchant == null ? (
//       // Prev button
// <button onClick={() => setPage(page - 1)} className="">
//   <svg
//     width={28}
//     height={28}
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect
//       width={28}
//       height={28}
//       rx={14}
//       transform="matrix(-1 0 0 1 28 0)"
//       fill="#F6C73B"
//     />
//     <path
//       d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
//       fill="#1D1D1D"
//     />
//   </svg>
// </button>
//     ) : (
//       <>
//         <button className="pointer-events-none">
//           <svg
//             width={28}
//             height={28}
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect
//               width={28}
//               height={28}
//               rx={14}
//               transform="matrix(-1 0 0 1 28 0)"
//               fill="#1a1a1a"
//             />
//             <path
//               d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
//               fill="#1a1a1a"
//             />
//           </svg>
//         </button>
//       </>
//     )}
//     {page != 5 ? (
//       // Progess Bar
// <div className="relative flex h-2 w-48 justify-between overflow-hidden bg-secondary-400">
//   <>
//     <div className="h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
//     <div className="z-10 h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
//     <div className="z-10 h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
//     <div className="z-10 h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
//     <div className="h-full w-1 border-2 border-secondary-500 bg-secondary-500" />
//     <div
//       className={`absolute h-full w-full border border-primary-300 bg-primary-300 duration-500 ${
//         page == 0
//           ? "-translate-x-48"
//           : page == 1
//           ? "-translate-x-36"
//           : page == 2
//           ? "-translate-x-24"
//           : page == 3
//           ? "-translate-x-12"
//           : ""
//       }`}
//     />
//   </>
// </div>
//     ) : (
//       <>
//         <Link href="/dashboard">
//           <div className="mx-auto">
//             <span className="rounded-full bg-primary-300 px-4 py-2 font-bold text-secondary-500">
//               Kembali
//             </span>
//           </div>
//         </Link>
//       </>
//     )}
//     {page != 5 ? (
//       // Next button
// <button
//   type={page != 4 ? "button" : "submit"}
//   // eslint-disable-next-line @typescript-eslint/no-misused-promises
//   onClick={
//     page != 4 ? () => incrementPage() : handleSubmit(submitHandler)
//   }
//   className="rotate-180"
// >
//   <svg
//     width={28}
//     height={28}
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect
//       width={28}
//       height={28}
//       rx={14}
//       transform="matrix(-1 0 0 1 28 0)"
//       fill="#F6C73B"
//     />
//     <path
//       d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
//       fill="#1D1D1D"
//     />
//   </svg>
// </button>
//     ) : (
//       <>
//         <button className="pointer-events-none">
//           <svg
//             width={28}
//             height={28}
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect
//               width={28}
//               height={28}
//               rx={14}
//               transform="matrix(-1 0 0 1 28 0)"
//               fill="#1a1a1a"
//             />
//             <path
//               d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
//               fill="#1a1a1a"
//             />
//           </svg>
//         </button>
//       </>
//     )}
//   </div>
// </>
//   );
// };
