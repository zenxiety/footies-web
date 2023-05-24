import Image from "next/image";
import Link from "next/link";
import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import { setInterval } from "timers";

const PesananMasuk = ({
  roles,
  pop,
  cancel,
  complete,
  detailPesanan,
  setPop,
  setCancel,
  setComplete,
  setDetailPesanan,
}: {
  roles: string;
  pop: boolean;
  cancel: boolean;
  complete: boolean;
  detailPesanan: boolean;
  setPop: Dispatch<SetStateAction<boolean>>;
  setCancel: Dispatch<SetStateAction<boolean>>;
  setComplete: Dispatch<SetStateAction<boolean>>;
  setDetailPesanan: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (pop) {
      setInterval(() => {
        setPop(false);
      }, 60000);
    }
  }, [pop]);

  const handleCancel = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setPop(false);
    setCancel(true);
  };

  const handleDetailNotif = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setPop(false);
    setDetailPesanan(true);
  };

  const handleAccept = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setPop(false);
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
        className={`fixed top-6 left-1/2 z-[60] w-[90%] -translate-x-1/2 rounded-3xl bg-primary-300 p-4 text-secondary-500 duration-[800ms] xs:w-[450px] ${
          pop ? "" : "-translate-y-[150%]"
        }`}
      >
        {/* summary pesanan atas */}
        <span className="text-lg text-secondary-200">Pesanan Masuk</span>
        {roles == "MERCHANT" ? (
          <>
            <div className="flex items-center justify-between">
              <span className="font-literata text-2xl font-bold">3 items</span>
              <span className="">Rp54.396</span>
            </div>
            <span>
              1 Burger Babi, 1 Burger Babi apa Babi, 1 Burger Babi Vegan
            </span>
          </>
        ) : (
          <>
            <p className="mt-2 text-xs font-bold text-white">Alamat Restoran</p>
            <p className="font-bold">Burger Klenger, Tegalrejo</p>
            <p className="mt-1 text-xs font-bold text-white">
              Alamat Tujuan • 2,0 KM
            </p>
            <p className="font-bold">
              Jl. Jalan Sama Kamu Tapi Apa MungkinJl. Jalan Sama Kamu Tapi Apa
              Mungkin
            </p>
            <p className="mt-2">Rp102.700</p>
          </>
        )}

        {/* buttons */}
        <div className="relative mt-6 flex justify-between pb-5 text-white">
          <button className="mx-4" onClick={(e) => handleCancel(e)}>
            <Image
              src="/assets/cancel.svg"
              alt=""
              width={20}
              height={20}
              quality={100}
            />
          </button>
          <Link
            href={
              roles == "MERCHANT" ? "/seller/my-orders" : "/driver/my-orders"
            }
          >
            <button className="text-lg" onClick={(e) => handleDetailNotif(e)}>
              Detail<span> &gt;</span>
            </button>
          </Link>
          <Link
            href={
              roles == "MERCHANT" ? "/seller/my-orders" : "/driver/my-orders"
            }
          >
            <button
              className="relative mx-4 h-full place-self-center"
              onClick={(e) => handleAccept(e)}
            >
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
          </Link>
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
