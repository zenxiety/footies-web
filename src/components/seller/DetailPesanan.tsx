import { defaultTransformer } from "@trpc/server";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const DetailPesanan = ({
  roles,
  cancel,
  setCancel,
  detailPesanan,
  setDetailPesanan,
}: {
  roles: string;
  cancel: boolean;
  setCancel: Dispatch<SetStateAction<boolean>>;
  detailPesanan: boolean;
  setDetailPesanan: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleCancel = () => {
    // setDetailPesanan(false);
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
            width: calc(100% - 2rem);
          }
          to {
            width: 0%;
          }
        }
      `}</style>
      <div
        className={`absolute inset-0 backdrop-blur-sm duration-1000 ${
          detailPesanan ? "" : "pointer-events-none opacity-0"
        }`}
      ></div>
      <div
        className={`fixed bottom-0 z-50 max-h-screen overflow-auto duration-1000 ${
          detailPesanan ? "" : "translate-y-[200%]"
        }`}
      >
        <div
          className={`w-full rounded-t-3xl bg-secondary-300 px-4 pt-6 duration-1000 xs:w-[500px] ${
            detailPesanan ? "" : ""
          }`}
        >
          <div className="mb-4 flex gap-x-5">
            <button onClick={() => setDetailPesanan(false)}>
              <Image
                src="/assets/arrow.svg"
                alt=""
                width={20}
                height={20}
                quality={100}
              />
            </button>
            <span>Detail Pesanan</span>
          </div>
          <p className="text-xs text-secondary-100">Pemesan: Diki Bagastama</p>
          <p className="text-xs text-secondary-100">ID Pesanan: 696969</p>
          <p className="mt-3 text-xs">Detail Pengantaran</p>
          <div className="mt-4">
            <div className="flex">
              <Image
                src="/assets/spoon-fork.svg"
                alt=""
                width={20}
                height={20}
                quality={100}
              />
              <div className="ml-4">
                <p className="text-xs leading-none text-secondary-100">
                  Alamat Restoran
                </p>
                <p>Burger Klenger, Tegalrejo</p>
              </div>
            </div>
            <div className="my-2 flex w-5 flex-col items-center justify-center gap-y-[2px]">
              <div className="h-1 w-1 rounded-full bg-white"></div>
              <div className="h-1 w-1 rounded-full bg-white"></div>
              <div className="h-1 w-1 rounded-full bg-white"></div>
              <div className="h-1 w-1 rounded-full bg-white"></div>
            </div>
            <div className="flex">
              <Image
                src="/assets/target.svg"
                alt=""
                width={20}
                height={20}
                quality={100}
                className="scale-125"
              />
              <div className="ml-4">
                <p className="max-h-[1em] overflow-hidden text-xs leading-none text-secondary-100">
                  Alamat Tujuan • 2.0 KM
                </p>
                <p className="">
                  Jl. Jalan Sama Kamu Tapi Apa Mung... Jl. Jalan Sama Kamu Tapi
                  Apa Mung...Jl. Jalan Sama Kamu Tapi Apa Mung...
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-3 bg-red-300">
            <div className="absolute -left-4 top-0 h-1 w-[calc(100%+2rem)] bg-secondary-400"></div>
          </div>
          <div className="mt-6">
            <span className="text-xs">Driver</span>
            <div className="my-3 flex items-center gap-x-4">
              <Image
                src="/assets/diki.png"
                alt=""
                width={40}
                height={40}
                quality={100}
                className="h-10 w-10 rounded-full"
              />
              <div className="leading-tight">
                <p className="">Diki Bagastama</p>
                <p className="text-xs text-secondary-100">AD 1111 KI</p>
                <p className="text-xs text-secondary-100">ID: D-696969</p>
              </div>
            </div>
          </div>
          <div className="relative mt-3 bg-red-300">
            <div className="absolute -left-4 top-0 h-1 w-[calc(100%+2rem)] bg-secondary-400"></div>
          </div>
          <div className="mt-6">
            <div>
              <span className="text-xs">Detail Pembayaran</span>
            </div>
            <div className="">
              <div className="my-4 flex justify-between">
                <div>
                  <span className="font-bold leading-none">1 Burger Babi</span>
                </div>
                <span>Rp20.000</span>
              </div>
              <div className="my-4 flex justify-between">
                <div>
                  <span className="font-bold leading-none">
                    1 Burger Babi apa Babi
                  </span>
                </div>
                <span>Rp30.000</span>
              </div>
              <div className="my-4 flex justify-between">
                <div>
                  <span className="font-bold leading-none">
                    1 Burger Babi Vegan
                  </span>
                  <p className="text-xs leading-none text-secondary-100">
                    Dengan saos, tanpa babi
                  </p>
                </div>
                <span>Rp40.000</span>
              </div>
              <div className="my-4 flex justify-between">
                <div>
                  <span className="font-bold leading-none text-primary-300">
                    Promo
                  </span>
                  <p className="text-xs leading-none text-secondary-100">
                    22.86%
                  </p>
                </div>
                <span>-Rp16.000</span>
              </div>
              <hr className="border-dashed" />
              <div className="my-4 flex justify-between">
                <div>
                  <span className="font-bold leading-none">Total</span>
                </div>
                <span>-Rp96.000</span>
              </div>
              <hr className="border-dashed" />
              <div className="my-4 flex justify-between">
                <div>
                  <span className="font-bold leading-none">Dibayar Cash</span>
                </div>
                <span>Rp54.000</span>
              </div>
            </div>
            <div className="relative -mx-4 flex justify-between bg-secondary-400 px-4 pt-6 pb-10">
              <button onClick={() => handleCancel()}>
                <Image
                  src="/assets/cancel.svg"
                  alt=""
                  width={20}
                  height={20}
                  quality={100}
                />
              </button>
              <button className="rounded-full bg-primary-300 py-2 px-4 font-bold text-secondary-400">
                Terima
              </button>
              <div className="absolute bottom-4 h-1 w-[calc(100%-2rem)] bg-secondary-300"></div>
              <div
                className={`absolute bottom-4 h-1 bg-white ${
                  detailPesanan ? "countdown" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPesanan;
