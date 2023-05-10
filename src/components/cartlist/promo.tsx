import React, {useState} from "react";
import Image from "next/image";

const Promo = ({
  formStep,
  cartStep,
  ketentuanStep,
}: {
  formStep: number;
  cartStep: () => void;
  ketentuanStep: () => void;
}) => {
  const voucher = [
    {
      color: "#0C7040",
      ready: "Siap dipakai",
      image: "/assets/makanan.png",
      deadline: "Berakhir 2 jam lagi (30 April 2023)",
      tipe: "Diskon 70%",
      diskon: {
        type1: "Diskon 70% Footies",
        type2: "Min. order 10k",
        type3: "Max. discount 20k",
      },
    },
    {
      color: "#EF8D32",
      ready: "Tambah 2k untuk menggunakan promo ini",
      image: "/assets/makanan.png",
      deadline: "Berakhir 2 jam lagi (30 April 2023)",
      tipe: "Diskon 70%",
      diskon: {
        type1: "Diskon 70% Footies",
        type2: "Min. order 10k",
        type3: "Max. discount 20k",
      },
    },
    {
      color: "#B2371E",
      ready: "Tambah 2k untuk menggunakan promo ini",
      image: "/assets/makanan.png",
      deadline: "Berakhir 2 jam lagi (30 April 2023)",
      tipe: "Diskon ongkir 12k",
      diskon: {
        type1: "No min. order",
      },
    },
    {
      color: "#B2371E",
      ready: "Tambah 2k untuk menggunakan promo ini",
      image: "/assets/makanan.png",
      deadline: "Berakhir 2 jam lagi (30 April 2023)",
      tipe: "Diskon ongkir 12k",
      diskon: {
        type1: "No min. order",
      },
    },
    {
      color: "#B2371E",
      ready: "Tambah 2k untuk menggunakan promo ini",
      image: "/assets/makanan.png",
      deadline: "Berakhir 2 jam lagi (30 April 2023)",
      tipe: "Diskon ongkir 12k",
      diskon: {
        type1: "No min. order",
      },
    },
  ];
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive((prev) => !prev);
  };
  return (
    <div className="pb-5" hidden={formStep != 2}>
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

          <p className="font-literata text-xl text-white">Promo</p>
        </div>
      </div>
      <div className="w-full bg-[#191919] px-8 py-5">
        <div className="rounded-xl border-2 border-[#4C6EF5] p-5">
          <div className="flex flex-row items-center gap-x-3">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-150"
            >
              <path
                d="M6.5 0C5.21442 0 3.95771 0.381218 2.8888 1.09545C1.81988 1.80968 0.986755 2.82484 0.494786 4.01256C0.00281635 5.20028 -0.125905 6.50721 0.124899 7.76808C0.375702 9.02896 0.994767 10.1872 1.90381 11.0962C2.81285 12.0052 3.97104 12.6243 5.23191 12.8751C6.49279 13.1259 7.79972 12.9972 8.98744 12.5052C10.1752 12.0132 11.1903 11.1801 11.9046 10.1112C12.6188 9.04228 13 7.78558 13 6.5C13 5.64641 12.8319 4.80117 12.5052 4.01256C12.1786 3.22394 11.6998 2.50739 11.0962 1.90381C10.4926 1.30022 9.77606 0.821438 8.98744 0.494783C8.19883 0.168127 7.35359 0 6.5 0ZM7.15 9.1C7.15 9.27239 7.08152 9.43772 6.95962 9.55962C6.83772 9.68152 6.67239 9.75 6.5 9.75C6.32761 9.75 6.16228 9.68152 6.04038 9.55962C5.91848 9.43772 5.85 9.27239 5.85 9.1V5.85C5.85 5.67761 5.91848 5.51228 6.04038 5.39038C6.16228 5.26848 6.32761 5.2 6.5 5.2C6.67239 5.2 6.83772 5.26848 6.95962 5.39038C7.08152 5.51228 7.15 5.67761 7.15 5.85V9.1ZM6.5 4.55C6.37144 4.55 6.24577 4.51188 6.13888 4.44045C6.03199 4.36903 5.94868 4.26752 5.89948 4.14874C5.85028 4.02997 5.83741 3.89928 5.86249 3.77319C5.88757 3.6471 5.94948 3.53128 6.04038 3.44038C6.13129 3.34948 6.2471 3.28757 6.37319 3.26249C6.49928 3.23741 6.62997 3.25028 6.74875 3.29948C6.86752 3.34867 6.96903 3.43199 7.04046 3.53888C7.11188 3.64577 7.15 3.77144 7.15 3.9C7.15 4.07239 7.08152 4.23772 6.95962 4.35962C6.83772 4.48152 6.67239 4.55 6.5 4.55Z"
                fill="#4C6EF5"
              />
            </svg>
            <p className="font-louis font-light text-white">
              Pilih salah satu atau lebih promo di bawah
            </p>
          </div>
        </div>
      </div>
      {voucher.map(({ color, ready, image, deadline, diskon, tipe }) => {
        return (
          <>
            <div
              className={`mx-8 mb-5 rounded-xl`}
              style={{ backgroundColor: color }}
            >
              <div className="flex flex-row items-center gap-x-3 px-5 py-3">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="scale-150"
                >
                  <path
                    d="M6.5 0C5.21442 0 3.95771 0.381218 2.8888 1.09545C1.81988 1.80968 0.986755 2.82484 0.494786 4.01256C0.00281635 5.20028 -0.125905 6.50721 0.124899 7.76808C0.375702 9.02896 0.994767 10.1872 1.90381 11.0962C2.81285 12.0052 3.97104 12.6243 5.23191 12.8751C6.49279 13.1259 7.79972 12.9972 8.98744 12.5052C10.1752 12.0132 11.1903 11.1801 11.9046 10.1112C12.6188 9.04228 13 7.78558 13 6.5C13 5.64641 12.8319 4.80117 12.5052 4.01256C12.1786 3.22394 11.6998 2.50739 11.0962 1.90381C10.4926 1.30022 9.77606 0.821438 8.98744 0.494783C8.19883 0.168127 7.35359 0 6.5 0ZM7.15 9.1C7.15 9.27239 7.08152 9.43772 6.95962 9.55962C6.83772 9.68152 6.67239 9.75 6.5 9.75C6.32761 9.75 6.16228 9.68152 6.04038 9.55962C5.91848 9.43772 5.85 9.27239 5.85 9.1V5.85C5.85 5.67761 5.91848 5.51228 6.04038 5.39038C6.16228 5.26848 6.32761 5.2 6.5 5.2C6.67239 5.2 6.83772 5.26848 6.95962 5.39038C7.08152 5.51228 7.15 5.67761 7.15 5.85V9.1ZM6.5 4.55C6.37144 4.55 6.24577 4.51188 6.13888 4.44045C6.03199 4.36903 5.94868 4.26752 5.89948 4.14874C5.85028 4.02997 5.83741 3.89928 5.86249 3.77319C5.88757 3.6471 5.94948 3.53128 6.04038 3.44038C6.13129 3.34948 6.2471 3.28757 6.37319 3.26249C6.49928 3.23741 6.62997 3.25028 6.74875 3.29948C6.86752 3.34867 6.96903 3.43199 7.04046 3.53888C7.11188 3.64577 7.15 3.77144 7.15 3.9C7.15 4.07239 7.08152 4.23772 6.95962 4.35962C6.83772 4.48152 6.67239 4.55 6.5 4.55Z"
                    fill="#EFEFEF"
                  />
                </svg>
                <p className="font-louis font-light text-white">{ready}</p>
              </div>
              <div className="bg-[#212121] p-5">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-x-5">
                    <Image src={image} alt="" width={100} height={100} />
                    <div className="flex flex-col gap-y-2">
                      <p className="font-literata text-xl text-white">{tipe}</p>
                      <ul className="font-louis text-white">
                        <li>{diskon?.type1}</li>
                        <li>{diskon?.type2}</li>
                        <li>{diskon?.type3}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-y-16">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="hover:cursor-pointer"
                      onClick={() => ketentuanStep()}
                    >
                      <path
                        d="M6.5 9.75C6.68417 9.75 6.83865 9.6876 6.96345 9.5628C7.08825 9.438 7.15043 9.28373 7.15 9.1V5.85C7.15 5.66583 7.0876 5.51135 6.9628 5.38655C6.838 5.26175 6.68373 5.19957 6.5 5.2C6.31583 5.2 6.16135 5.2624 6.03655 5.3872C5.91175 5.512 5.84957 5.66627 5.85 5.85V9.1C5.85 9.28417 5.9124 9.43865 6.0372 9.56345C6.162 9.68825 6.31627 9.75043 6.5 9.75ZM6.5 4.55C6.68417 4.55 6.83865 4.4876 6.96345 4.3628C7.08825 4.238 7.15043 4.08373 7.15 3.9C7.15 3.71583 7.0876 3.56135 6.9628 3.43655C6.838 3.31175 6.68373 3.24957 6.5 3.25C6.31583 3.25 6.16135 3.3124 6.03655 3.4372C5.91175 3.562 5.84957 3.71627 5.85 3.9C5.85 4.08417 5.9124 4.23865 6.0372 4.36345C6.162 4.48825 6.31627 4.55043 6.5 4.55ZM6.5 13C5.60083 13 4.75583 12.8293 3.965 12.4878C3.17417 12.1463 2.48625 11.6833 1.90125 11.0987C1.31625 10.5137 0.853233 9.82583 0.5122 9.035C0.171167 8.24417 0.000433333 7.39917 0 6.5C0 5.60083 0.170733 4.75583 0.5122 3.965C0.853667 3.17417 1.31668 2.48625 1.90125 1.90125C2.48625 1.31625 3.17417 0.853233 3.965 0.5122C4.75583 0.171167 5.60083 0.000433333 6.5 0C7.39917 0 8.24417 0.170733 9.035 0.5122C9.82583 0.853667 10.5137 1.31668 11.0987 1.90125C11.6837 2.48625 12.147 3.17417 12.4884 3.965C12.8299 4.75583 13.0004 5.60083 13 6.5C13 7.39917 12.8293 8.24417 12.4878 9.035C12.1463 9.82583 11.6833 10.5137 11.0987 11.0987C10.5137 11.6837 9.82583 12.147 9.035 12.4884C8.24417 12.8299 7.39917 13.0004 6.5 13ZM6.5 11.7C7.95167 11.7 9.18125 11.1962 10.1887 10.1887C11.1962 9.18125 11.7 7.95167 11.7 6.5C11.7 5.04833 11.1962 3.81875 10.1887 2.81125C9.18125 1.80375 7.95167 1.3 6.5 1.3C5.04833 1.3 3.81875 1.80375 2.81125 2.81125C1.80375 3.81875 1.3 5.04833 1.3 6.5C1.3 7.95167 1.80375 9.18125 2.81125 10.1887C3.81875 11.1962 5.04833 11.7 6.5 11.7Z"
                        fill="#EFEFEF"
                      />
                    </svg>
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
                          "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white peer-checked:scale-[0.8] peer-checked:bg-[#F4B829]  peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="rounded-b-xl bg-[#2F2D2D]">
                <div className="flex flex-row items-center gap-x-3 px-5 py-3">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 0C5.21442 0 3.95771 0.381218 2.8888 1.09545C1.81988 1.80968 0.986755 2.82484 0.494786 4.01256C0.00281632 5.20028 -0.125905 6.50721 0.124899 7.76809C0.375702 9.02896 0.994767 10.1872 1.90381 11.0962C2.81285 12.0052 3.97104 12.6243 5.23191 12.8751C6.49279 13.1259 7.79972 12.9972 8.98744 12.5052C10.1752 12.0132 11.1903 11.1801 11.9046 10.1112C12.6188 9.04229 13 7.78558 13 6.5C13 5.64641 12.8319 4.80117 12.5052 4.01256C12.1786 3.22394 11.6998 2.50739 11.0962 1.90381C10.4926 1.30022 9.77606 0.821438 8.98744 0.494783C8.19883 0.168127 7.35359 0 6.5 0ZM9.1 7.15H6.5C6.32761 7.15 6.16228 7.08152 6.04038 6.95962C5.91848 6.83772 5.85 6.67239 5.85 6.5V3.9C5.85 3.72761 5.91848 3.56228 6.04038 3.44038C6.16228 3.31848 6.32761 3.25 6.5 3.25C6.67239 3.25 6.83772 3.31848 6.95962 3.44038C7.08152 3.56228 7.15 3.72761 7.15 3.9V5.85H9.1C9.27239 5.85 9.43772 5.91848 9.55962 6.04038C9.68152 6.16228 9.75 6.32761 9.75 6.5C9.75 6.67239 9.68152 6.83772 9.55962 6.95962C9.43772 7.08152 9.27239 7.15 9.1 7.15Z"
                      fill="#EFEFEF"
                    />
                  </svg>

                  <p className="font-louis font-light text-white">{deadline}</p>
                </div>
              </div>
            </div>
          </>
        );
      })}
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
export default Promo;
