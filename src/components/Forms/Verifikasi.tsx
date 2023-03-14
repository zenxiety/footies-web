import Image from "next/image";

export default function Verifikasi({ page }: { page: number }) {
  return (
    <>
      {/* 5) Verifikasi */}
      <div
        className={`z-10 flex h-full min-h-screen w-screen flex-col items-center justify-between pt-20 ${
          page == 5 ? "" : "-translate-y-[200%]"
        }`}
      >
        <div>
          <p className="px-20">Sedang Dalam</p>
          <p className="px-20">Proses Verifikasi</p>
        </div>
        <div className="relative select-none">
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
    </>
  );
}
