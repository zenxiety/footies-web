import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";
import { setInterval } from "timers";

const PesananMasuk = ({
  pop,
  cancel,
  setPop,
  setCancel,
}: {
  pop: boolean;
  cancel: boolean;
  setPop: Dispatch<SetStateAction<boolean>>;
  setCancel: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (pop) {
      setInterval(() => {
        setPop(false);
      }, 60000);
    }
  }, [pop]);

  const handleCancel = () => {
    setPop(false);
    setCancel(true);
  };

  return (
    <>
      <style jsx>{`
        .countdown {
          animation: countdown 60s linear infinite;
        }

        @keyframes countdown {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
      <div
        className={`fixed top-6 left-1/2 w-[90%] -translate-x-1/2 rounded-3xl bg-primary-300 p-4 text-secondary-500 duration-[800ms] xs:w-[450px] ${
          pop ? "" : "-translate-y-[150%]"
        }`}
      >
        {/* summary pesanan atas */}
        <span className="text-lg text-secondary-200">Pesanan Masuk</span>
        <div className="flex items-center justify-between">
          <span className="font-literata text-2xl font-bold">3 items</span>
          <span className="">Rp54.396</span>
        </div>
        <span>1 Burger Babi, 1 Burger Babi apa Babi, 1 Burger Babi Vegan</span>
        {/* buttons */}
        <div className="relative mt-6 flex justify-between pb-5 text-white">
          <button className="mx-4" onClick={() => handleCancel()}>
            <Image
              src="/assets/cancel.svg"
              alt=""
              width={20}
              height={20}
              quality={100}
            />
          </button>
          <Link href="/seller/my-orders">
            <button className="text-lg" onClick={() => setPop(false)}>
              Detail<span> &gt;</span>
            </button>
          </Link>
          <button className="relative mx-4 h-full place-self-center">
            <Image
              src="/assets/accept.svg"
              alt=""
              width={20}
              height={20}
              quality={100}
              className="relative z-10"
            />
            <div className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-success"></div>
          </button>
          <div className="absolute bottom-0 h-1 w-full bg-primary-100"></div>
          <div
            className={`absolute bottom-0 h-1 bg-white ${
              pop ? "countdown" : ""
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PesananMasuk;
