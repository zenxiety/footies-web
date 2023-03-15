import { Role } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ComingSoon from "./ComingSoon";

export default function Menu({ roles }: { roles: Role }) {
  const menuBuyer = ["pesanan", "langganan", "promo", "pesan", "keluar"];
  const menuSeller = ["daganganku", ...menuBuyer];

  const [popup, setPopup] = useState(false);
  const menus = roles == "USER" ? menuBuyer : menuSeller;

  return (
    <>
      <div className="mt-[4vh] w-full">
        {menus.map((menu, i) => MenuBar(menu, i, popup, setPopup))}
      </div>
    </>
  );
}

function MenuBar(
  menu: string,
  i: number,
  popup: boolean,
  setPopup: Dispatch<SetStateAction<boolean>>
) {
  const children = (
    <div
      className={`flex items-center justify-between border-others-white bg-others-black px-5 py-3 duration-500 active:bg-secondary-400 ${
        i == 0 ? "border-y" : "border-b"
      }`}
      key={i}
    >
      <div className="flex items-center justify-center gap-x-3 text-others-white">
        <div className="flex w-7 items-center justify-center">
          {MenuIcon(menu)}
        </div>
        <span className="font-literata text-[15px] font-medium capitalize">
          {menu}
        </span>
      </div>
      {Arrow()}
    </div>
  );

  return menu == "keluar" ? (
    // <button className="block w-full" onClick={() => signOut()}>
    <button className="block w-full" onClick={() => void signOut()}>
      {children}
    </button>
  ) : (
    <>
      <ComingSoon popup={popup} setPopup={setPopup}>
        {children}
      </ComingSoon>
    </>
  );
}

function MenuIcon(menu: string) {
  if (menu == "pesanan")
    return (
      <svg
        width={23}
        height={25}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.625 1.875L18.75 0l-1.875 1.875L15 0l-1.875 1.875L11.25 0 9.375 1.875 7.5 0 5.625 1.875 3.75 0v17.5H0v3.75A3.745 3.745 0 003.75 25h15a3.745 3.745 0 003.75-3.75V0l-1.875 1.875zM15 22.5H3.75c-.688 0-1.25-.563-1.25-1.25V20H15v2.5zm5-1.25c0 .688-.563 1.25-1.25 1.25-.688 0-1.25-.563-1.25-1.25V17.5H6.25V3.75H20v17.5z"
          fill="#EAEAEA"
        />
        <path
          d="M7.5 6.25H15v2.5H7.5v-2.5zm0 3.75H15v2.5H7.5V10zm8.75-3.75h2.5v2.5h-2.5v-2.5zm0 3.75h2.5v2.5h-2.5V10z"
          fill="#EAEAEA"
        />
      </svg>
    );
  else if (menu == "daganganku")
    return (
      <svg
        width={24}
        height={25}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.042 22.375a2.328 2.328 0 01-1.708-.71 2.323 2.323 0 01-.709-1.707V3.042c0-.665.237-1.234.71-1.708A2.322 2.322 0 013.042.625h16.916c.665 0 1.234.237 1.708.71.473.474.71 1.043.709 1.707v10.663a5.986 5.986 0 00-1.148-.543 8.354 8.354 0 00-1.269-.333V3.042H3.042v16.916H11.5c0 .423.03.836.09 1.239.061.403.162.795.303 1.178H3.042zm14.5 2.417v-3.625h-3.625V18.75h3.625v-3.625h2.416v3.625h3.625v2.417h-3.625v3.625h-2.416zm-10.875-7.25c.342 0 .63-.116.861-.348.232-.232.348-.52.347-.86 0-.343-.116-.63-.348-.862a1.165 1.165 0 00-.86-.347c-.343 0-.63.116-.862.348a1.165 1.165 0 00-.347.86c0 .343.116.63.348.862.232.232.52.348.86.347zm0-4.834c.342 0 .63-.116.861-.348.232-.232.348-.518.347-.86 0-.342-.116-.63-.348-.861a1.165 1.165 0 00-.86-.347c-.343 0-.63.116-.862.348a1.164 1.164 0 00-.347.86c0 .342.116.63.348.861.232.232.52.348.86.347zm0-4.833c.342 0 .63-.116.861-.348.232-.232.348-.519.347-.86 0-.343-.116-.63-.348-.862a1.165 1.165 0 00-.86-.347c-.343 0-.63.116-.862.348a1.165 1.165 0 00-.347.86c0 .343.116.63.348.862.232.232.52.348.86.347zm3.625 4.833h7.25v-2.416h-7.25v2.416zm0-4.833h7.25V5.458h-7.25v2.417zm0 9.667h1.63a6.96 6.96 0 01.605-1.3c.242-.402.524-.775.846-1.117h-3.081v2.417z"
          fill="#EFEFEF"
        />
      </svg>
    );
  else if (menu == "langganan")
    return (
      <svg
        width={23}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.65 4.571H0v2.286h12.65V4.571zm0-4.571H0v2.286h12.65V0zM0 11.429h8.05V9.143H0v2.286zm21.275-5.143L23 8l-8.05 8-5.175-5.143L11.5 9.143l3.45 3.428 6.325-6.285z"
          fill="#EAEAEA"
        />
      </svg>
    );
  else if (menu == "promo")
    return (
      <svg
        width={25}
        height={25}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.653 16.321l7.668-7.668"
          stroke="#EAEAEA"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.292 9.931a.639.639 0 100-1.278.639.639 0 000 1.278zM15.682 16.321a.639.639 0 100-1.278.639.639 0 000 1.278z"
          fill="#EAEAEA"
          stroke="#EAEAEA"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.542 6.353a2.811 2.811 0 012.811-2.811h1.278c.742 0 1.454-.295 1.98-.818l.895-.895a2.811 2.811 0 013.988 0l.894.895a2.812 2.812 0 001.981.818h1.278a2.812 2.812 0 012.812 2.811v1.278c0 .742.294 1.454.817 1.98l.895.895a2.81 2.81 0 010 3.988l-.895.894a2.812 2.812 0 00-.817 1.981v1.278a2.812 2.812 0 01-2.812 2.812h-1.278c-.742 0-1.454.294-1.98.817l-.895.895a2.812 2.812 0 01-3.988 0l-.894-.895a2.811 2.811 0 00-1.981-.817H6.353a2.811 2.811 0 01-2.811-2.812v-1.278c0-.742-.295-1.454-.818-1.98l-.895-.895a2.812 2.812 0 010-3.988l.895-.894a2.812 2.812 0 00.818-1.981V6.353z"
          stroke="#EAEAEA"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  else if (menu == "pesan")
    return (
      <svg
        width={21}
        height={21}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.25 12.583h8.333V10.5H4.25v2.083zm0-3.125h12.5V7.375H4.25v2.083zm0-3.125h12.5V4.25H4.25v2.083zM.083 20.917V2.167c0-.573.204-1.064.613-1.471a2.011 2.011 0 011.47-.613h16.667c.573 0 1.064.204 1.472.613.409.408.612.898.612 1.47v12.5c0 .574-.205 1.064-.613 1.473a2.002 2.002 0 01-1.47.611H4.25L.083 20.917zm2.084-5.026l1.224-1.224h15.442v-12.5H2.167V15.89z"
          fill="#EAEAEA"
        />
      </svg>
    );
  else
    return (
      <svg
        width={25}
        height={25}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#prefix__clip0_366_2101)" fill="#EAEAEA">
          <path d="M6.25 2.083h9.375a2.083 2.083 0 012.083 2.084V6.25h-2.083V4.167H6.25v16.666h9.375V18.75h2.083v2.083a2.083 2.083 0 01-2.083 2.084H6.25a2.083 2.083 0 01-2.083-2.084V4.167A2.083 2.083 0 016.25 2.083z" />
          <path d="M18.385 15.948l1.47 1.469 5.207-5.209L19.855 7l-1.469 1.469 2.688 2.698H11v2.083h10.073l-2.688 2.698z" />
        </g>
        <defs>
          <clipPath id="prefix__clip0_366_2101">
            <path fill="#fff" d="M0 0h25v25H0z" />
          </clipPath>
        </defs>
      </svg>
    );
}

function Arrow() {
  return (
    <div className="my-auto">
      <svg width={7} height={10} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.469 2.402C6.03 3.665 6.826 4.316 6.852 4.355v1.192c-.3.234-.886.71-1.758 1.426-.56.455-1.673 1.367-3.34 2.734a44.258 44.258 0 00-.879-1.055L4.293 5.86a70.89 70.89 0 011.113-.918c-.182-.143-.553-.449-1.113-.918C3.72 3.568 2.581 2.643.875 1.25c.156-.182.45-.54.879-1.074.456.377 1.36 1.12 2.715 2.226z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}
