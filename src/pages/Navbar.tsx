import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const data = [
  {
    id: 1,
    logo: "fas fa-home",
  },
  {
    id: 2,
    logo: "fas fa-building",
  },
  {
    id: 3,
    logo: "fas fa-bell-concierge fa-light",
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
    <>
      <div className="relative h-screen bg-[#141313]">
        <div className="absolute bottom-0 z-0 h-[10%] w-full rounded-t-md border-t-2 border-t-primary-300 bg-gray-700">
         
            <div className="relative flex flex-row items-center justify-around px-4 pt-7">
              {data.map((item) => (
                <div
                  className={
                    item.id == 2
                      ? `${item.logo} hover:text-primary-300 hover:underline pr-[25%] text-4xl text-white`
                      : item.id !== 3
                      ? `${item.logo} hover:text-primary-300 hover:underline text-4xl text-white `
                      : `${item.logo} hover:text-primary-300 hover:underline absolute left-[50%] -top-[60%] translate-x-[-50%] rounded-full border-2  border-primary-300 bg-gray-700 p-4 text-5xl text-white`
                  }
                />
              ))}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
