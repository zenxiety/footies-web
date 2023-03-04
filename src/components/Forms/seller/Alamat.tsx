import { useForm } from "react-hook-form";
import { FormValues, useFormData } from "../../../context/seller";
import Nav from "./Nav";

export default function Alamat({
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
  } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    console.log(values);
    setFormValues(values);
    nextFormStep();
  };

  {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative h-screen pt-20"
      >
        <div className="z-10 mx-auto w-screen px-8 xs:max-w-[500px]">
          <p>Alamat toko</p>
          <div className="mt-5 h-full w-full">
            {/* <Map /> */}
            <p className="mt-6 mb-1 mr-auto text-start text-sm text-secondary-100">
              Alamat Toko <span className="text-failed">*</span>
            </p>
            <input
              {...register("alamat", {
                required: "Alamat Toko tidak boleh kosong",
              })}
              type="text"
              className={`w-full border-b bg-transparent py-1 font-louis text-[14px] font-light text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none ${
                errors.alamat ? "border-failed" : "border-secondary-100"
              }`}
            />
            {errors.alamat && (
              <span className="mt-[1em] block text-start font-louis text-[12px] text-failed">
                Alamat toko tidak boleh kosong
              </span>
            )}
          </div>
        </div>
        <Nav prevFormStep={prevFormStep} />
      </form>
    );
  }
}
