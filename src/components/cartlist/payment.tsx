import React, { useState } from "react";
import Image from "next/image";
const PembayaranDigital = [
  {
    image: "/assets/wallet.svg",
    nama: "Footies Points",
    saldo: "Saldo: Rp 99.999",
  },
  {
    image: "/assets/jago.png",
    nama: "Main Pocket",
  },
];
const TambahJenis = [
  {
    image: "/assets/linkaja.png",
    nama: "Link Aja",
  },
  {
    image: "/assets/credit.png",
    nama: "Credit or debit card",
    deskripsi: "Visa, Mastercard, AMEX, and JCB",
  },
];
const Lainnya = [
  {
    image: "/assets/money.png",
    nama: "Tunai",
  },
  {
    image: "/assets/ethereum.png",
    nama: "Ethereum",
    saldo: "Saldo: ETH 99.999",
  },
];
const Payment = ({
  formStep,
  cartStep,
}: {
  formStep: number;
  cartStep: () => void;
}) => {
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive((prev) => !prev);
  };
  return (
    <div hidden={formStep != 1}>
      <div className="relative h-full w-full overflow-hidden bg-[#212121]">
        <div className="flex flex-row items-center gap-x-4 pt-16 pl-12 pb-8">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scale-[150%] hover:cursor-pointer"
            onClick={() => cartStep()}
          >
            <path
              d="M6.87502 15.3001L0.275016 8.70006C0.175016 8.60006 0.104015 8.49173 0.0620154 8.37506C0.0200154 8.25839 -0.000651042 8.13339 1.56251e-05 8.00006C1.56251e-05 7.86673 0.0210158 7.74173 0.0630158 7.62506C0.105016 7.50839 0.175682 7.40006 0.275016 7.30006L6.87502 0.70006C7.05835 0.516727 7.28768 0.421061 7.56302 0.413061C7.83835 0.405061 8.07568 0.500727 8.27501 0.70006C8.47501 0.883394 8.57935 1.11273 8.58802 1.38806C8.59668 1.66339 8.50068 1.90073 8.30002 2.10006L3.40002 7.00006H14.575C14.8583 7.00006 15.096 7.09606 15.288 7.28806C15.48 7.48006 15.5757 7.71739 15.575 8.00006C15.575 8.28339 15.4793 8.52106 15.288 8.71306C15.0967 8.90506 14.859 9.00073 14.575 9.00006H3.40002L8.30002 13.9001C8.48335 14.0834 8.57935 14.3167 8.58802 14.6001C8.59668 14.8834 8.50068 15.1167 8.30002 15.3001C8.11668 15.5001 7.88335 15.6001 7.60002 15.6001C7.31668 15.6001 7.07502 15.5001 6.87502 15.3001Z"
              fill="#EFEFEF"
            />
          </svg>

          <p className="font-literata text-xl text-white">
            Pilih Metode Pembayaran
          </p>
        </div>
      </div>
      <div className="w-full bg-[#191919] px-8 py-5">
        <div className="rounded-xl border-2 border-primary-300 p-5">
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-row items-center justify-between gap-x-5">
              <svg
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 0C24.8364 0 32 3.90691 32 8.72727V14.5455C32 19.3658 24.8364 23.2727 16 23.2727C7.32073 23.2727 0.256 19.504 0.00727272 14.8029L0 14.5455V8.72727C0 3.90691 7.16364 0 16 0ZM16 17.4545C10.5891 17.4545 5.80364 15.9898 2.90909 13.7455V14.5455C2.90909 17.2829 8.55709 20.3636 16 20.3636C23.2873 20.3636 28.8553 17.4109 29.0836 14.7171L29.0909 14.5455L29.0924 13.7455C26.1978 15.9884 21.4124 17.4545 16 17.4545ZM16 2.90909C8.55709 2.90909 2.90909 5.98982 2.90909 8.72727C2.90909 11.4647 8.55709 14.5455 16 14.5455C23.4429 14.5455 29.0909 11.4647 29.0909 8.72727C29.0909 5.98982 23.4429 2.90909 16 2.90909Z"
                  fill="#F6C73B"
                />
                <path
                  d="M13.3897 7.42569C13.5071 7.42569 13.6025 7.33562 13.6066 7.2231C13.6025 7.11057 13.5071 7.02051 13.3897 7.02051C13.2723 7.02051 13.1769 7.11057 13.1729 7.2231C13.1768 7.33562 13.2723 7.42569 13.3897 7.42569Z"
                  fill="#F6C73B"
                />
                <path
                  d="M13.3896 6.92432C13.2246 6.92432 13.0908 7.05806 13.0908 7.22304C13.0908 7.38801 13.2246 7.52177 13.3896 7.52177C13.5545 7.52177 13.6883 7.38801 13.6883 7.22304C13.6883 7.05806 13.5545 6.92432 13.3896 6.92432ZM13.3895 7.4403C13.2696 7.4403 13.1723 7.34632 13.1723 7.23036C13.1723 7.22789 13.1726 7.22549 13.1727 7.22304C13.1726 7.2206 13.1723 7.21818 13.1723 7.21572C13.1723 7.09976 13.2696 7.00579 13.3895 7.00579C13.5095 7.00579 13.6068 7.09976 13.6068 7.21572C13.6068 7.21818 13.6065 7.2206 13.6064 7.22304C13.6065 7.22549 13.6068 7.22789 13.6068 7.23036C13.6068 7.34632 13.5095 7.4403 13.3895 7.4403Z"
                  fill="#F6C73B"
                />
                <path
                  d="M16.6757 10.1676L15.106 11.1757C15.3526 11.3912 15.9671 11.7419 16.4521 11.4213C16.937 11.1006 16.7669 10.3646 16.6757 10.1676Z"
                  fill="#F6C73B"
                  stroke="#F6C73B"
                  stroke-width="0.117356"
                  stroke-linecap="round"
                />
                <path
                  d="M15.5005 6.2517C15.7427 6.2517 15.9394 6.06594 15.9478 5.83386C15.9394 5.60178 15.7427 5.41602 15.5005 5.41602C15.2583 5.41602 15.0615 5.60178 15.0532 5.83386C15.0615 6.06594 15.2583 6.2517 15.5005 6.2517Z"
                  fill="#F6C73B"
                />
                <path
                  d="M15.4994 5.21777C15.1592 5.21777 14.8833 5.49363 14.8833 5.83389C14.8833 6.17413 15.1592 6.45001 15.4994 6.45001C15.8397 6.45001 16.1156 6.17413 16.1156 5.83389C16.1156 5.49363 15.8397 5.21777 15.4994 5.21777ZM15.4994 6.28198C15.2519 6.28198 15.0513 6.08816 15.0513 5.84899C15.0513 5.84389 15.052 5.83893 15.0522 5.83389C15.052 5.82885 15.0513 5.82387 15.0513 5.8188C15.0513 5.57963 15.252 5.38581 15.4994 5.38581C15.7469 5.38581 15.9475 5.57963 15.9475 5.8188C15.9475 5.82387 15.9469 5.82885 15.9468 5.83389C15.9469 5.83893 15.9475 5.84389 15.9475 5.84899C15.9475 6.08816 15.7469 6.28198 15.4994 6.28198Z"
                  fill="#F6C73B"
                />
                <path
                  d="M14.2407 6.71069C14.3907 6.71069 14.5125 6.59569 14.5177 6.45202C14.5125 6.30835 14.3907 6.19336 14.2407 6.19336C14.0908 6.19336 13.969 6.30835 13.9639 6.45202C13.969 6.59569 14.0908 6.71069 14.2407 6.71069Z"
                  fill="#F6C73B"
                />
                <path
                  d="M14.2403 6.0708C14.0297 6.0708 13.8589 6.24157 13.8589 6.45221C13.8589 6.66283 14.0297 6.83362 14.2403 6.83362C14.4509 6.83362 14.6217 6.66283 14.6217 6.45221C14.6217 6.24157 14.4509 6.0708 14.2403 6.0708ZM14.2403 6.7296C14.0871 6.7296 13.9629 6.60961 13.9629 6.46155C13.9629 6.4584 13.9633 6.45533 13.9634 6.45221C13.9633 6.44909 13.9629 6.446 13.9629 6.44286C13.9629 6.29481 14.0871 6.17482 14.2403 6.17482C14.3935 6.17482 14.5177 6.29481 14.5177 6.44286C14.5177 6.446 14.5173 6.44909 14.5172 6.45221C14.5173 6.45533 14.5177 6.4584 14.5177 6.46155C14.5177 6.60961 14.3935 6.7296 14.2403 6.7296Z"
                  fill="#F6C73B"
                />
                <path
                  d="M14.7816 10.9141C15.071 9.37289 14.8997 8.50288 14.5926 8.30952L14.8396 8.22845C15.3982 9.69317 15.2794 10.4295 15.2682 10.6931C15.2082 10.9477 15.0328 11.0107 14.9813 11.0256C14.8052 11.1106 14.7748 10.9867 14.7816 10.9141Z"
                  fill="#F6C73B"
                  stroke="#F6C73B"
                  stroke-width="0.0586781"
                />
                <path
                  d="M16.3353 7.32666C15.0132 8.01949 15.826 9.39724 16.3977 9.99952C16.4425 10.0327 16.4631 10.0216 16.5933 9.92133C16.6283 9.87219 16.3674 9.45206 16.3333 9.40237C15.8772 8.73819 15.5333 7.5542 16.8273 7.27277L16.3353 7.32666Z"
                  fill="#F6C73B"
                  stroke="#F6C73B"
                  stroke-width="0.0586781"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.1743 7.00761C16.1575 7.09644 16.1708 7.19093 16.2168 7.27456C16.2168 7.27456 16.2167 7.2746 16.2166 7.2747L16.3672 7.49614L16.3675 7.49591C16.4287 7.56919 16.5118 7.61597 16.6007 7.63272C16.9305 7.69493 17.3339 7.3622 17.4084 6.96741C17.4495 6.74945 17.306 6.53926 17.0881 6.49815C16.6933 6.42368 16.2364 6.67821 16.1743 7.00761Z"
                  fill="#F6C73B"
                />
                <path
                  d="M14.0825 7.58984L14.3605 8.24653C14.3836 8.30125 14.4971 8.38227 14.7658 8.26855M14.7658 8.26855C15.0344 8.15484 15.0553 8.01697 15.0321 7.96224L14.7541 7.30556M14.7658 8.26855L14.4183 7.4477"
                  stroke="#F6C73B"
                  stroke-width="0.176034"
                  stroke-linecap="round"
                />
                <g clip-path="url(#clip0_2222_6003)">
                  <path
                    d="M17.1305 6.11571C17.4534 6.11571 17.7158 5.86803 17.727 5.55859C17.7158 5.24915 17.4534 5.00146 17.1305 5.00146C16.8076 5.00146 16.5452 5.24915 16.5342 5.55859C16.5452 5.86803 16.8076 6.11571 17.1305 6.11571Z"
                    fill="#F6C73B"
                  />
                  <path
                    d="M17.1306 4.7373C16.6769 4.7373 16.3091 5.10511 16.3091 5.5588C16.3091 6.01245 16.677 6.38029 17.1306 6.38029C17.5843 6.38029 17.9521 6.01245 17.9521 5.5588C17.9521 5.10511 17.5843 4.7373 17.1306 4.7373ZM17.1306 6.15625C16.8006 6.15625 16.5331 5.89781 16.5331 5.57893C16.5331 5.57213 16.534 5.56552 16.5342 5.5588C16.534 5.55208 16.5331 5.54543 16.5331 5.53867C16.5331 5.21978 16.8006 4.96135 17.1306 4.96135C17.4606 4.96135 17.728 5.21978 17.728 5.53867C17.728 5.54543 17.7272 5.55208 17.7271 5.5588C17.7273 5.56552 17.728 5.57213 17.728 5.57893C17.728 5.89781 17.4606 6.15625 17.1306 6.15625Z"
                    fill="#F6C73B"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2222_6003">
                    <rect
                      width="2.3898"
                      height="2.3898"
                      fill="white"
                      transform="translate(15.9077 4.36377)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div className="flex flex-col items-start justify-center">
                <p className="font-literata text-[#EFEFEF]">Footies Coins</p>
                <p className="font-louis font-light text-[#EFEFEF]">
                  Saldo: 3.458
                </p>
              </div>
            </div>
            <label>
              <input
                type="checkbox"
                onClick={toggle}
                // checked={isChecked}
                // onChange={handleCheckboxChange}
                className="peer hidden"
                // style={{ display: "none" }} // hide default checkbox
              />
              <span // custom checkbox style
                className={
                  "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white hover:cursor-pointer peer-checked:scale-[0.8]  peer-checked:bg-[#F4B829] peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
                }
              />
            </label>
          </div>
          <p className="font-louis font-light text-white">
            1 Footies Coins setara dengan Rp1. Kamu bisa kombinasikan dengan
            jenis pembayaran lainnya.
          </p>
        </div>
      </div>
      <div className="border-t-[1px] border-b-[1px] border-t-white border-b-white bg-[#212121]">
        <p className="p-5 font-literata text-xl text-white">
          Pembayaran Digital
        </p>
        {PembayaranDigital.map(({ image, nama, saldo }, i) => {
          return (
            <>
              <div className="p-5">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-between gap-x-5">
                    <Image src={image} alt="" width={25} height={25} />
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-literata text-[#EFEFEF]">{nama}</p>
                      <p className="font-louis font-light text-[#EFEFEF]">
                        {saldo}
                      </p>
                    </div>
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      onClick={toggle}
                      // checked={isChecked}
                      // onChange={handleCheckboxChange}
                      className="peer hidden"
                      // style={{ display: "none" }} // hide default checkbox
                    />
                    <span // custom checkbox style
                      className={
                        "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white hover:cursor-pointer peer-checked:scale-[0.8]  peer-checked:bg-[#F4B829] peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
                      }
                    />
                  </label>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="border-b-[1px] border-b-white bg-[#212121]">
        <p className="p-5 font-literata text-xl text-white">Tambah Jenis</p>
        {TambahJenis.map(({ image, nama, deskripsi }, i) => {
          return (
            <>
              <div className="p-5">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-between gap-x-5">
                    <Image src={image} alt="" width={25} height={25} />
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-literata text-[#EFEFEF]">{nama}</p>
                      <p className="font-louis font-light text-[#EFEFEF]">
                        {deskripsi}
                      </p>
                    </div>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hover:cursor-pointer"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 0C5.37258 0 0 5.3726 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.3726 18.6274 0 12 0ZM15.9398 13.355C16.6013 13.355 17.1376 12.8187 17.1376 12.1572C17.1376 11.4956 16.6013 10.9594 15.9398 10.9594H13.4263V8.4459C13.4263 7.73014 12.8461 7.1499 12.1303 7.1499C11.4146 7.1499 10.8343 7.73014 10.8343 8.4459V10.9594H8.32087C7.65933 10.9594 7.12305 11.4956 7.12305 12.1572C7.12305 12.8187 7.65933 13.355 8.32087 13.355H10.8343V15.8685C10.8343 16.5842 11.4146 17.1645 12.1303 17.1645C12.8461 17.1645 13.4263 16.5842 13.4263 15.8685V13.355H15.9398Z"
                      fill="#F6C73B"
                    />
                  </svg>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="border-b-[1px] border-b-white bg-[#212121] pb-20">
        <p className="p-5 font-literata text-xl text-white">Lainnya</p>
        {Lainnya.map(({ image, nama, saldo }, i) => {
          return (
            <>
              <div className="p-5">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-between gap-x-5">
                    <Image src={image} alt="" width={25} height={25} />
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-literata text-[#EFEFEF]">{nama}</p>
                      <p className="font-louis font-light text-[#EFEFEF]">
                        {saldo}
                      </p>
                    </div>
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      onClick={toggle}
                      // checked={isChecked}
                      // onChange={handleCheckboxChange}
                      className="peer hidden"
                      // style={{ display: "none" }} // hide default checkbox
                    />
                    <span // custom checkbox style
                      className={
                        "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white hover:cursor-pointer peer-checked:scale-[0.8]  peer-checked:bg-[#F4B829] peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
                      }
                    />
                  </label>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div
        className={`fixed z-[100] h-fit w-full max-w-[500px] rounded-t-xl bg-secondary-500 p-8 pt-3 ${
          active ? "bottom-0 duration-300" : "-bottom-40 duration-300"
        }`}
      >
        <button className="mx-auto block w-full rounded-lg bg-primary-300 py-3 font-louis text-xl">
          Pakai
        </button>
      </div>
    </div>
  );
};

export default Payment;
