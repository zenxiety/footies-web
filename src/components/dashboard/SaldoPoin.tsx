export default function SaldoPoin() {
  return (
    <>
      {/* Saldo & Poin */}
      <div className="mt-[2.5vh] text-secondary-500">
        <span className="font-literata text-[15px] font-medium text-primary-300">
          Saldo & Poin
        </span>
        <div className="relative mt-[1vh] grid grid-cols-2 rounded-md bg-primary-300 px-4 pb-3 pt-4">
          <div className="flex flex-col items-start">
            <svg
              width={16}
              height={16}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.158 12.632v.842a1.684 1.684 0 01-1.684 1.684H1.684A1.684 1.684 0 010 13.474V1.684A1.684 1.684 0 011.684 0h11.79a1.684 1.684 0 011.684 1.684v.842H7.579a1.684 1.684 0 00-1.684 1.685v6.736a1.684 1.684 0 001.684 1.685m0-1.685H16V4.211H7.579m3.368 4.631a1.263 1.263 0 110-2.526 1.263 1.263 0 010 2.526z"
                fill="#1F1F1F"
              />
            </svg>
            <div className="mt-1 font-literata text-[10px] font-light leading-none">
              Domfeet
            </div>
            <span className="text-[14px] font-bold">Rp169.069</span>
          </div>
          <div className="absolute top-1/2 left-1/2 h-3/4 w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-500"></div>
          <div className="ml-3 flex flex-col items-start">
            <svg
              width={21}
              height={15}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.313 0c5.695 0 10.312 2.518 10.312 5.625v3.75c0 3.107-4.617 5.625-10.313 5.625C4.718 15 .165 12.57.005 9.54L0 9.376v-3.75C0 2.518 4.617 0 10.313 0zm0 11.25c-3.488 0-6.572-.944-8.438-2.39v.515c0 1.764 3.64 3.75 8.438 3.75 4.696 0 8.285-1.903 8.432-3.64l.005-.11v-.516c-1.865 1.446-4.95 2.391-8.438 2.391zm0-9.375c-4.798 0-8.438 1.986-8.438 3.75s3.64 3.75 8.438 3.75c4.797 0 8.437-1.986 8.437-3.75s-3.64-3.75-8.438-3.75z"
                fill="#1F1F1F"
              />
            </svg>

            <div className="mt-1 font-literata text-[10px] font-light leading-none">
              Footies Points
            </div>
            <span className="text-[14px] font-bold">Rp169.069</span>
          </div>
        </div>
      </div>
    </>
  );
}
