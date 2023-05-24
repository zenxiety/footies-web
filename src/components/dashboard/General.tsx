import { Role } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import ComingSoon from "./ComingSoon";

export default function General({ roles }: { roles: Role }) {
  const generals = [
    "pengaturan",
    "bantuan dan tiket",
    "kebijakan privasi",
    "nilai aplikasi footies",
  ];

  return (
    <>
      <div className="mt-[4vh]">
        <span className="ml-5 font-literata text-[15px] font-medium text-primary-300">
          Umum
        </span>
      </div>
      <div className="mt-[.5vh]">
        {generals.map((menu, i) => MenuBar(menu, i))}
      </div>
    </>
  );
}

function MenuBar(menu: string, i: number) {
  const [popup, setPopup] = useState(false);
  return (
    <>
      <button onClick={() => setPopup(true)} className="block w-full">
        <div
          className={`flex items-center justify-between border-others-white bg-others-black px-5 py-3 duration-500 active:bg-secondary-400 ${
            i == 0 ? "border-y" : "border-b"
          }`}
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
      </button>
      <ComingSoon popup={popup} setPopup={setPopup}>
        {}
      </ComingSoon>
    </>
  );
}

function MenuIcon(menu: string) {
  if (menu == "pengaturan")
    return (
      <svg
        width={21}
        height={22}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.276 11.691a1.048 1.048 0 010-1.382L20.617 8.8a1.047 1.047 0 00.126-1.226L18.648 3.95a1.048 1.048 0 00-1.121-.503l-1.97.398a1.048 1.048 0 01-1.204-.692l-.64-1.917a1.048 1.048 0 00-.995-.712h-4.19a1.048 1.048 0 00-1.048.712l-.586 1.917a1.048 1.048 0 01-1.205.692l-2.022-.398a1.048 1.048 0 00-1.048.503L.524 7.574A1.048 1.048 0 00.63 8.8l1.33 1.509a1.048 1.048 0 010 1.382L.63 13.2a1.048 1.048 0 00-.105 1.226L2.62 18.05a1.048 1.048 0 001.121.503l1.97-.398a1.048 1.048 0 011.205.692l.639 1.917a1.048 1.048 0 001.047.712h4.19a1.047 1.047 0 00.996-.712l.639-1.917a1.047 1.047 0 011.205-.692l1.97.398a1.047 1.047 0 001.12-.503l2.095-3.624a1.047 1.047 0 00-.125-1.226l-1.415-1.509zm-1.56 1.404l.838.943-1.341 2.326-1.237-.252a3.142 3.142 0 00-3.614 2.096l-.398 1.173H9.282l-.377-1.194a3.143 3.143 0 00-3.614-2.096l-1.236.252-1.362-2.315.838-.943a3.143 3.143 0 000-4.19l-.838-.944 1.34-2.304 1.237.251a3.143 3.143 0 003.614-2.095l.398-1.184h2.682l.398 1.194a3.143 3.143 0 003.614 2.096l1.237-.252 1.34 2.326-.838.943a3.143 3.143 0 000 4.17zM10.622 6.81a4.19 4.19 0 100 8.38 4.19 4.19 0 000-8.38zm0 6.285a2.095 2.095 0 110-4.189 2.095 2.095 0 010 4.19z"
          fill="#EFEFEF"
        />
      </svg>
    );
  else if (menu == "bantuan dan tiket")
    return (
      <svg
        width={21}
        height={17}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.167 6.05V2.017A2.017 2.017 0 0018.15 0H2.017A2.017 2.017 0 000 2.017V6.05a2.017 2.017 0 010 4.033v4.034c0 1.109.907 2.016 2.017 2.016H18.15c1.11 0 2.017-.907 2.017-2.016v-4.034a2.023 2.023 0 01-2.017-2.016c0-1.11.908-2.017 2.017-2.017zM18.15 4.578a4.047 4.047 0 00-2.017 3.489c0 1.482.817 2.793 2.017 3.489v2.56H2.017v-2.56a4.047 4.047 0 002.016-3.49 3.989 3.989 0 00-2.016-3.488V2.017H18.15v2.56zm-9.075 6.514h2.017v2.016H9.075m0-6.05h2.017v2.017H9.075m0-6.05h2.017v2.017H9.075V3.025z"
          fill="#EFEFEF"
        />
      </svg>
    );
  else if (menu == "kebijakan privasi")
    return (
      <svg
        width={18}
        height={23}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.593 8.302a.71.71 0 00-1.004-1.004L4.586 9.3l-.563-.513a.71.71 0 00-.955 1.047l1.063.971a.71.71 0 00.979-.023l2.482-2.481.001.001zm0 6.087a.709.709 0 010 1.004L5.11 17.875a.71.71 0 01-.98.021l-1.063-.971a.71.71 0 01.955-1.047l.563.515 2.003-2.004a.707.707 0 011.004 0zm2.334.857a.71.71 0 000 1.418h3.546a.709.709 0 100-1.419H9.927zm-.709-6.382a.71.71 0 01.71-.71h3.545a.709.709 0 110 1.419H9.927a.71.71 0 01-.709-.71zM6.382 0a2.127 2.127 0 00-2.007 1.418H2.127A2.127 2.127 0 000 3.545v17.019a2.127 2.127 0 002.127 2.127h12.764a2.127 2.127 0 002.127-2.127V3.545a2.127 2.127 0 00-2.127-2.127h-2.248A2.127 2.127 0 0010.636 0H6.382zm-.71 2.127a.71.71 0 01.71-.709h4.254a.71.71 0 010 1.418H6.382a.71.71 0 01-.71-.709zm-3.545.71h2.248a2.127 2.127 0 002.007 1.418h4.254a2.127 2.127 0 002.007-1.419h2.248a.71.71 0 01.709.71v17.018a.709.709 0 01-.71.709H2.128a.709.709 0 01-.709-.71V3.546a.71.71 0 01.71-.709z"
          fill="#EFEFEF"
        />
      </svg>
    );
  else if (menu == "nilai aplikasi footies")
    return (
      <svg
        width={23}
        height={21}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.985 6.309l6.002.52c1.09.087 1.525 1.451.694 2.17l-4.551 3.944 1.364 5.865c.248 1.067-.905 1.91-1.848 1.34L11.5 17.035l-5.146 3.1c-.943.57-2.096-.272-1.848-1.339l1.364-5.853-4.551-3.944c-.83-.719-.384-2.083.707-2.17l5.99-.508L10.358.79c.422-1.005 1.86-1.005 2.282 0l2.344 5.518zM11.5 14.716l-4.663 2.815 1.24-5.307L3.96 8.652l5.432-.47L11.5 3.183l2.12 5.01 5.432.47-4.117 3.572 1.24 5.308-4.675-2.828z"
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
