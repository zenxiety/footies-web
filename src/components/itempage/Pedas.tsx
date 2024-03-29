import React from "react";

const Pedas = () => {
  return (
    <>
      <div className="relative bg-secondary-400 px-5 mt-6 rounded-md">
        <div className="relative flex flex-col gap-y-5 py-5">
          <h1 className="font-literata text-2xl text-white">
            Tingkat Kepedasan
          </h1>
          <h1 className="font-louis text-sm text-white">
            <span className="text-failed">Wajib</span> - Pilih 1
          </h1>
          <div className="rounded-xl border-2 border-white bg-secondary-300 p-5">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-louis text-white">Tidak Pedas</h1>
              <div className="flex flex-row items-center justify-between gap-x-2">
                <h1 className="font-louis text-white">Gratis</h1>
                <label>
                  <input type="checkbox" className="peer hidden" />
                  <span
                    className={
                      "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white peer-checked:scale-[0.8] peer-checked:bg-[#F4B829]  peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
                    }
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between pt-6">
              <h1 className="font-louis text-white">Sedang</h1>
              <div className="flex flex-row items-center justify-between gap-x-2">
                <h1 className="font-louis text-white">Gratis</h1>
                <label>
                  <input type="checkbox" className="peer hidden" />
                  <span
                    className={
                      "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white peer-checked:scale-[0.8] peer-checked:bg-[#F4B829]  peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
                    }
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between pt-6">
              <h1 className="font-louis text-white">Pedas</h1>
              <div className="flex flex-row items-center justify-between gap-x-2">
                <h1 className="font-louis text-white">+2.000</h1>
                <label>
                  <input type="checkbox" className="peer hidden" />
                  <span
                    className={
                      "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white peer-checked:scale-[0.8] peer-checked:bg-[#F4B829]  peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pedas;
