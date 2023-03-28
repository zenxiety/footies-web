import React from "react";

const History = () => {
  const history = [
    {
      item: "nasi uduk",
    },
    {
      item: "nasi goreng",
    },
    {
      item: "nasi padang",
    },
    {
      item: "burger",
    },
    {
      item: "daging babi",
    },
  ];
  return (
    <>
      <div className="w-full bg-secondary-500 p-5">
        <h1 className="pb-5 font-literata text-2xl text-white">
          Riwayat Pencarian
        </h1>
        <div className="flex flex-row flex-wrap justify-start gap-x-2">
          {history.map(({ item }) => {
            return (
              <div className="my-1 w-fit bg-primary-300 p-1">
                <h1 className="font-louis">{item}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default History;
