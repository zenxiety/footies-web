import { useReducer, useState } from "react";
import { render } from "react-dom";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form/dist/useFieldArray";
import { FormValues, useFormData } from "../../../context/seller";
import Nav from "./Nav";

export default function Detail({
  prevFormStep,
  formStep,
  nextFormStep,
}: {
  prevFormStep: () => void;
  formStep: number;
  nextFormStep: () => void;
}) {
  const { data, setFormValues } = useFormData();

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<FormValues>({ mode: "all" });

  const onSubmit = (values: FormValues) => {
    setFormValues(values);
    nextFormStep();
  };

  const [tempLabel, setTempLabel] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [, forceupdate] = useReducer((x: number) => x + 1, 0);

  const handleLabelChange = (e: string) => {
    setTempLabel(() => e);
  };
  const handleLabelEnter = (e: string) => {
    // console.log(tempLabel);
    if (e == " " && tempLabel != " ") {
      // if (labels[1] === null) tempLabel;
      setLabels((labels) => [...labels, tempLabel.trim()]);
      setTempLabel("");
      // console.log("labels : ", labels);
    }
  };
  const handleLabelDelete = (label: string) => {
    labels.splice(labels.indexOf(label), 1);
    setLabels(labels);
    forceupdate(); // biar kerender ulang, pas hapus salah satu label ga telat hehe
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-screen pt-20">
      <div className="z-10 mx-auto w-screen xs:max-w-[500px]">
        <div className="flex flex-col justify-between">
          <p>Detail Toko</p>
          <div className="mx-auto mt-12 w-1/3">
            <p className="mb-1 text-[15px] text-others-white">Jam Buka</p>
            <div className="relative flex gap-x-6">
              <input
                {...register("jamBuka")}
                type="number"
                autoComplete={"off"}
                className="spin w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] text-others-white">
                :
              </p>
              <input
                type="number"
                autoComplete={"off"}
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
            </div>
            <p className="mt-7 mb-1 text-[15px] text-others-white">Jam Tutup</p>
            <div className="relative flex gap-x-6">
              <input
                {...register("jamTutup")}
                type="number"
                autoComplete={"off"}
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] text-others-white">
                :
              </p>
              <input
                type="number"
                autoComplete={"off"}
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
            </div>
            <p className="mt-7 text-[15px] text-others-white">Label</p>
            <input
              type="text"
              autoComplete={"off"}
              value={tempLabel.trim()}
              onChange={(e) => handleLabelChange(e.target.value)}
              onKeyDown={(e) => handleLabelEnter(e.key)}
              className="w-2/3 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
            />
          </div>
        </div>
        <div className="mx-5 mt-5 flex max-h-[30vh] flex-wrap gap-2 overflow-y-auto pr-2">
          {labels.map((label, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-x-3 overflow-hidden text-ellipsis bg-primary-300 px-2 py-1 font-louis text-base text-secondary-500 xs:max-w-[460px]"
            >
              <p className="overflow-hidden text-ellipsis">{label}</p>
              <button type="button" onClick={() => handleLabelDelete(label)}>
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
        <button
          type="button"
          // className="absolute bottom-7 translate-x-28 opacity-100 hue-rotate-180 xs:right-28 xs:translate-x-0"
          className="text-secondary-50 mt-4 rounded-full border border-primary-300 py-2 px-4 font-louis text-base duration-500 active:bg-primary-300"
          onClick={() => {
            setValue("labels", labels);
          }}
        >
          Terapkan label
          {/* <svg
            width={28}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <rect
              width={28}
              height={28}
              rx={14}
              transform="matrix(-1 0 0 1 28 0)"
              fill="#F6C73B"
            />
            <path
              d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
              fill="#1D1D1D"
            />
          </svg> */}
        </button>
      </div>
      <Nav prevFormStep={prevFormStep} />
    </form>
  );
}
