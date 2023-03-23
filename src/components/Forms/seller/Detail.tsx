import {
  type ChangeEvent,
  type KeyboardEvent,
  useState,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import { useFormData } from "../../../context/FormContext";
import { SellerFormValues } from "../../../pages/auth/signup/seller";
import Nav from "../Nav";

export default function Detail({
  prevFormStep,
  formStep,
  nextFormStep,
}: {
  prevFormStep: () => void;
  formStep: number;
  nextFormStep: () => void;
}) {
  const { setFormValues } = useFormData();
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<SellerFormValues>({ mode: "all" });

  const onSubmit = (values: SellerFormValues) => {
    setFormValues(values);
    nextFormStep();
  };

  const [tempLabel, setTempLabel] = useState("");
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    register("labels", {
      required: "Wajib mengisi minimal 1 label",
    });
  }, [register]);

  const handleTimeLength = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 2) {
      e.currentTarget.value = e.currentTarget.value.slice(0, 2);
    }
  };

  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTempLabel(() => e.target.value);
  };
  const handleLabelEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key == "Enter" && e.preventDefault();
    // console.log(tempLabel);
    if (e.key == " " && tempLabel != " ") {
      // if (labels[1] === null) tempLabel;
      setLabels((labels) => [...labels, tempLabel.trim()]);
      setTempLabel("");
      setValue("labels", [...labels, tempLabel.trim()], {
        shouldValidate: true,
      });
      // console.log("labels : ", labels);
    }
  };
  const handleLabelDelete = (label: string) => {
    setLabels((labels) => labels.filter((l) => l !== label));
    setValue(
      "labels",
      labels.filter((l) => l !== label),
      { shouldValidate: true }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col items-center justify-between pt-20"
    >
      <div className="z-10 mx-auto w-screen xs:max-w-[500px]">
        <div className="flex flex-col justify-between">
          <p>Detail Toko</p>
          <div className="mx-auto mt-12 w-1/3">
            <p className="mb-1 text-[15px] text-others-white">Jam Buka</p>
            <div className="relative flex gap-x-6">
              <input
                {...register("jamBuka")}
                type="number"
                onChange={(e) => handleTimeLength(e)}
                autoComplete={"off"}
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] text-others-white">
                :
              </p>
              <input
                type="number"
                onChange={(e) => handleTimeLength(e)}
                autoComplete={"off"}
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
            </div>
            <p className="mt-7 mb-1 text-[15px] text-others-white">Jam Tutup</p>
            <div className="relative flex gap-x-6">
              <input
                {...register("jamTutup")}
                type="number"
                onChange={(e) => handleTimeLength(e)}
                autoComplete={"off"}
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] text-others-white">
                :
              </p>
              <input
                type="number"
                onChange={(e) => handleTimeLength(e)}
                autoComplete={"off"}
                className="w-1/2 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
              />
            </div>
            <p className="mt-7 text-[15px] text-others-white">Label</p>
            <input
              type="text"
              autoComplete={"off"}
              value={tempLabel.trim()}
              onChange={(e) => handleLabelChange(e)}
              onKeyDown={(e) => handleLabelEnter(e)}
              className="w-2/3 border-b border-others-white bg-transparent py-1 text-center font-louis font-light tracking-wider text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none"
            />
            {errors.labels && (
              <p className="text-error mt-[1em] font-louis text-[12px] text-failed">
                {errors.labels.message}
              </p>
            )}
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
      </div>
      <Nav prevFormStep={prevFormStep} />
    </form>
  );
}
