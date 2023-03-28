import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

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
  const router = useRouter();
  return (
    <div className="fixed bottom-0 z-50 h-fit  w-full max-w-[500px] bg-[#141313]">
      <div className="bottom-0 z-0 h-[10%] rounded-t-md border-t-2 border-t-primary-300 bg-gray-700">
        <div className="flex flex-row items-center justify-around px-4 py-4">
          {/* {data.map((item) => (
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
          ))} */}
          <i className="fas fa-house text-4xl text-white hover:text-primary-300" onClick={() => router.push("/homepage")}/>
          <i className="fas fa-building pr-[25%] text-4xl text-white hover:text-primary-300 hover:underline" onClick={() => router.push("/")}/>
          <i className="fas fa-search absolute left-[50%] -top-[40%] translate-x-[-50%] rounded-full border-2 border-primary-300 bg-gray-700  p-4 text-5xl text-white hover:text-primary-300" onClick={() => router.push("/search")}/>
          <i className="fas fa-receipt text-4xl text-white hover:text-primary-300 hover:underline" onClick={() => router.push("/homepage")}/>
          <i className="fas fa-user text-4xl text-white hover:text-primary-300 hover:underline" onClick={() => router.push("/homepage")}/>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
