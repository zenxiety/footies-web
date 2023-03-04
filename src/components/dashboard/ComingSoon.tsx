import React from "react";

export default function ComingSoon({
  popup,
  setPopup,
  children,
}: {
  popup: boolean;
  setPopup: (popup: boolean) => void;
  children: any;
}) {
  return (
    <>
      <button onClick={() => setPopup(true)} className="block w-full">
        {children}
      </button>
      <div
        className={`fixed top-0 m-auto flex h-full w-full max-w-[500px] items-center justify-center overflow-hidden duration-500 ${
          popup ? "scale-100" : "scale-0 opacity-0"
        }`}
      >
        <div
          onClick={() => setPopup(false)}
          className={`fixed inset-0 h-screen w-screen backdrop-blur delay-500 duration-1000 ${
            popup ? "" : "opacity-0"
          }`}
        />
        <div className="relative mx-6 rounded-md border-2 border-primary-300 bg-secondary-500 px-12 py-6 text-center delay-200">
          <button
            onClick={() => setPopup(false)}
            className="absolute top-4 left-4"
          >
            <svg
              width={17}
              height={17}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y={1.414}
                width={2}
                height={21}
                rx={1}
                transform="rotate(-45 0 1.414)"
                fill="#F6C73B"
              />
              <rect
                x={14.849}
                width={2}
                height={21}
                rx={1}
                transform="rotate(45 14.85 0)"
                fill="#F6C73B"
              />
            </svg>
          </button>
          <p className="font-literata text-5xl text-primary-300">Coming Soon</p>
        </div>
      </div>
    </>
  );
}
