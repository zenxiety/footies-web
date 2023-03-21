import React, { ReactNode, useState } from "react";
import Item from "./Item";

export default function Category({
  menus,
}: {
  menus: {
    name: string;
    price: number;
    isAvailable: boolean;
    category: string[];
    id: number;
  }[];
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
        {menus.map((menu, i: number) => {
          console.log("category: ", menu.id, itemPopup);
          return (
            <Item
              key={i}
              index={menu.id}
              itemPopup={itemPopup}
              setItemPopup={setItemPopup}
            />
          );
        })}
      </div>
    </>
  );
}
