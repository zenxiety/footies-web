import { inferRouterOutputs } from "@trpc/server";
import React, { ReactNode, useState } from "react";
import { AppRouter } from "../../server/api/root";
import Item from "./Item";

type RouterOutput = inferRouterOutputs<AppRouter>;

export default function Category({
  menus,
}: {
  menus: RouterOutput["merchant"]["getMenu"] | undefined;
}) {
  const [itemPopup, setItemPopup] = useState(0);
  return (
    <>
      {/* Popup Overlay Layer */}
      <div
        onClick={() => setItemPopup(0)}
        className={`absolute inset-0 z-10 bg-black/25 backdrop-blur-sm duration-500 ${
          itemPopup != 0 ? "" : "pointer-events-none opacity-0"
        }`}
      ></div>
      <div className="my-4 bg-secondary-400 px-5 py-2">
        <h2 className="font-literata text-xl font-semibold">Promo</h2>
        <hr className="my-4 border border-dashed border-others-black" />
        {/* Item */}
        {menus?.map(({ id }, i: number) => {
          return (
            <Item
              key={id}
              id={id}
              index={i + 1}
              itemPopup={itemPopup}
              setItemPopup={setItemPopup}
              menu={menus[i]}
            />
          );
        })}
      </div>
    </>
  );
}
