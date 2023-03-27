import React from "react";
import Image from "next/image";

const History = () => {
  const data = [
    {
      title: "Makanan Berat",
      image: "/assets/kategori.png",
    },
    {
      title: "Makanan Cepat Saji",
      image: "/assets/kategori.png",
    },
    {
      title: "Minuman",
      image: "/assets/kategori.png",
    },
    {
      title: "Seafood",
      image: "/assets/kategori.png",
    },
    {
      title: "Faris",
      image: "/assets/kategori.png",
    },
    {
      title: "Zaidan",
      image: "/assets/kategori.png",
    },
  ];
  return (
    <>
      <div className="w-full bg-secondary-300 p-5 rounded-t-xl">
        <h1 className="pb-5 font-literata text-2xl text-white">
          Jelajahi jenis makanan
        </h1>
        <div className="grid grid-cols-3 justify-start gap-x-2">
          {data.map(({ title, image }) => {
            return (
              <>
                <div className="flex flex-col">
                  <Image
                    src={image}
                    alt=""
                    className={`mx-auto block rounded-xl`}
                    width={100}
                    height={100}
                    // onClick={toggleKategori}
                  />
                  <div className="flex flex-col items-center justify-center py-2 text-center">
                    <p className=" block font-louis text-sm font-light text-white">
                      {title}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default History;
