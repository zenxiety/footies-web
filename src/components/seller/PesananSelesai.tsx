import Image from "next/image";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

const PesananSelesai = ({
  complete,
  setComplete,
}: {
  complete: boolean;
  setComplete: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleComplete = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setComplete(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 bottom-0 left-1/2 z-[60] w-full -translate-x-1/2 bg-others-black/80 backdrop-blur-sm duration-[800ms] xs:w-[500px] ${
          complete ? "" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`fixed top-1/2 left-1/2 z-[60] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-md border border-primary-300 bg-secondary-500 p-8 text-white duration-[800ms] xs:w-[450px]`}
        >
          <div className="flex gap-x-3">
            <Image
              src="/assets/question.svg"
              alt=""
              width={46}
              height={40}
              quality={100}
            />
            <span className="font-literata text-lg">
              Apakah anda yakin ingin menyelesaikan pesanan?
            </span>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={(e) => handleComplete(e)}
              className="rounded-md border border-primary-300 px-3 font-literata text-lg"
            >
              Tidak
            </button>
            <button
              onClick={(e) => handleComplete(e)}
              className="rounded-md border border-primary-300 bg-primary-300 px-3 font-literata text-lg text-secondary-500"
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PesananSelesai;
