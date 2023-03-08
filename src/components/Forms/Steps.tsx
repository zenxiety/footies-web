import React from "react";

export default function Steps({
  page,
  setPage,
  title,
  steps,
}: {
  page: number;
  setPage: (page: number) => void;
  title: string[];
  steps: string[];
}) {
  return (
    <>
      <div
        className={`absolute inset-0 z-[99] flex h-full w-full flex-col overflow-hidden bg-secondary-500 pt-24 shadow-md duration-1000 ${
          page == 0 ? "" : "-translate-y-[100%]"
        }`}
      >
        <div className="px-8">
          <div>
            <span className="font-literata text-2xl font-semibold text-primary-300">
              {title[0]}
            </span>
            <p className="text-others-white">
              Kamu hanya perlu {title[1]} cara untuk menjadi{" "}
              <span className="text-primary-300">{title[2]}</span> di aplikasi
              Footies.
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
          className="mx-8 mt-10 rounded-md bg-primary-300 py-3 font-louis text-[14px] font-bold text-secondary-500 duration-500 active:bg-primary-100"
        >
          Daftar Sekarang
        </button>
      </div>
    </>
  );
}
