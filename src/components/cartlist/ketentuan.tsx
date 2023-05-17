import React, { useState } from "react";

const Ketentuan = ({
  formStep,
  promoStep,
}: {
  formStep: number;
  promoStep: () => void;
}) => {
  return (
    <div hidden={formStep != 3}>
      <div className="relative h-full w-full overflow-hidden bg-[#212121]">
        <div className="flex flex-row items-center gap-x-4 pt-16 pl-12 pb-8">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scale-[150%] hover:cursor-pointer"
            onClick={() => promoStep()}
          >
            <path
              d="M6.87502 15.3001L0.275016 8.70006C0.175016 8.60006 0.104015 8.49173 0.0620154 8.37506C0.0200154 8.25839 -0.000651042 8.13339 1.56251e-05 8.00006C1.56251e-05 7.86673 0.0210158 7.74173 0.0630158 7.62506C0.105016 7.50839 0.175682 7.40006 0.275016 7.30006L6.87502 0.70006C7.05835 0.516727 7.28768 0.421061 7.56302 0.413061C7.83835 0.405061 8.07568 0.500727 8.27501 0.70006C8.47501 0.883394 8.57935 1.11273 8.58802 1.38806C8.59668 1.66339 8.50068 1.90073 8.30002 2.10006L3.40002 7.00006H14.575C14.8583 7.00006 15.096 7.09606 15.288 7.28806C15.48 7.48006 15.5757 7.71739 15.575 8.00006C15.575 8.28339 15.4793 8.52106 15.288 8.71306C15.0967 8.90506 14.859 9.00073 14.575 9.00006H3.40002L8.30002 13.9001C8.48335 14.0834 8.57935 14.3167 8.58802 14.6001C8.59668 14.8834 8.50068 15.1167 8.30002 15.3001C8.11668 15.5001 7.88335 15.6001 7.60002 15.6001C7.31668 15.6001 7.07502 15.5001 6.87502 15.3001Z"
              fill="#EFEFEF"
            />
          </svg>

          <p className="font-literata text-xl text-white">
            Syarat dan Ketentuan
          </p>
        </div>
      </div>
      <div className="h-screen w-full bg-[#191919] px-8 py-5">
        <div className="rounded-xl bg-[#0C7040] p-5">
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
                fill="#EFEFEF"
              />
            </svg>

            <p className="font-louis font-light text-white">Siap dipakai</p>
          </div>
        </div>
        <h1 className="pt-5 text-justify font-louis text-white">
          1) PENTING: Voucher hanya dapat digunakan untuk layanan Footies
          Delivery, tidak untuk Pickup. Kamu dapat menikmati bentuk promo
          lainnya untuk layanan Pickup, cek di tab &quot;Pickup&quot; atau tab
          &quot;Promo&quot;.
        </h1>
        <h1 className="pt-5 text-justify font-louis text-white">
          2) Voucher dapat digunakan di hampir semua resto Footies Partner.
        </h1>
        <h1 className="pt-5 text-justify font-louis text-white">
          3) Biaya pembelian yang kurang dari nominal voucher, tidak berlaku
          pengembalian.
        </h1>
        <h1 className="pt-5 text-justify font-louis text-white">
          4) Biaya pembelian yang lebih besar dari nominal voucher, maka sisa
          biaya dapat dilakukan dengan metode pembayaran Footies.
        </h1>
        <h1 className="pt-5 text-justify font-louis text-white">
          5) Penggunaan voucher tidak dapat digabungkan dengan voucher lainnya.
        </h1>
        <h1 className="pt-5 text-justify font-louis text-white">
          6) Voucher akan hangus apabila ditemukan indikasi kecurangan dalam
          mendapatkan voucher ini
        </h1>
        <h1 className="pt-5 text-justify font-louis text-white">
          7) Voucher hanya berlaku untuk minimum pembelian Rp15.000
        </h1>
      </div>
    </div>
  );
};

export default Ketentuan;
