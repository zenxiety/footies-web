import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const data = [
  {
    id: 1,
    logo: "fas fa-house",
  },
  {
    id: 2,
    logo: "fas fa-building",
  },
  {
    id: 3,
    logo: "fas fa-bell-concierge",
  },
  {
    id: 4,
    logo: "fas fa-receipt",
  },
  {
    id: 5,
    logo: "fas fa-store",
  },
];

const Navbar = () => {
  return (
    <div className="h-fit fixed bg-[#141313] z-50 bottom-0">
      <div className="bottom-0 z-0 h-[10%] rounded-t-md border-t-2 border-t-primary-300 bg-gray-700">
        <div className="flex flex-row items-center justify-around px-4 pt-7">
          {data.map((item) => (
            <>
              <div
                key={item.id}
                className={
                  item.id == 2
                    ? `${item.logo} pr-[25%] text-4xl text-white hover:text-primary-300 hover:underline`
                    : item.id !== 3
                    ? `${item.logo} text-4xl text-white hover:text-primary-300 hover:underline`
                    : `${item.logo} absolute left-[50%] -top-[40%] translate-x-[-50%] rounded-full border-2 border-primary-300 bg-gray-700  p-4 text-5xl text-white hover:text-primary-300 hover:underline`
                }
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
