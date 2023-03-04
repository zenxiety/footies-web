import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFormData } from "../../../context/seller";
import Nav from "./Nav";

export default function Detail({
  prevFormStep,
  formStep,
  nextFormStep,
}: {
  prevFormStep: any;
  formStep: any;
  nextFormStep: any;
}) {
  const { setFormValues } = useFormData();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: "all" });

  const onSubmit = (values: object) => {
    setFormValues(values);
    nextFormStep();
  };

  const [labels, setLabels] = useState(["Chinese"]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-screen pt-20">
      <div className="z-10 w-screen">
        <div className="flex flex-col justify-between">
          <p>Detail Toko</p>
          <div className="mx-auto mt-12 w-1/3">
            <p className="mb-1 text-[15px] text-others-white">Jam Buka</p>
            <div className="relative flex gap-x-6">
              <input
                {...register("jamBuka")}
                type="number"
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] text-others-white">
                :
              </p>
              <input
                type="number"
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
            </div>
            <p className="mt-7 mb-1 text-[15px] text-others-white">Jam Tutup</p>
            <div className="relative flex gap-x-6">
              <input
                {...register("jamTutup")}
                type="number"
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] text-others-white">
                :
              </p>
              <input
                type="number"
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
            </div>
            <p className="mt-7 text-[15px] text-others-white">Label</p>
            <input
              type="text"
              className="w-2/3 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
            />
          </div>
        </div>
        <div className="ml-5 mt-5 flex flex-wrap gap-2">
          {labels.map((label, i) => (
            <div
              key={i}
              className="flex items-center gap-x-3 bg-primary-300 px-2 py-1 font-louis text-base text-secondary-500"
            >
              <p>{label}</p>
              <button onClick={() => labels.splice(labels.indexOf(label), 1)}>
                <svg
                  width={14}
                  height={13}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width={1.563}
                    height={16.417}
                    rx={0.782}
                    transform="rotate(-44.936 2.007 -.566)"
                    fill="#1A1A1A"
                  />
                  <rect
                    width={1.563}
                    height={16.417}
                    rx={0.782}
                    transform="rotate(44.936 6.125 15.317)"
                    fill="#1A1A1A"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <Nav prevFormStep={prevFormStep} nextFormStep={nextFormStep} />
    </form>
  );
}
