import Image from "next/image";
import { useForm } from "react-hook-form";
import { useFormData } from "../../../context/seller";
import Nav from "./Nav";

export default function Info({
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-screen pt-20">
      <div className="z-10 w-screen">
        <p>Informasi</p>
        <p>Toko</p>
        <div className="mt-5 flex w-full justify-center">
          <Image src="/signup/info.png" alt="" width={300} height={210} />
        </div>
        <p className="ml-9 mt-6 mr-auto text-start text-sm text-secondary-100">
          Nama Toko <span className="text-failed">*</span>
        </p>
        <input
          {...register("nama", {
            required: "Nama Toko tidak boleh kosong",
          })}
          autoComplete={"off"}
          type="text"
          className={`w-[80%] border-b bg-transparent py-1 font-louis text-[14px] font-light text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none ${
            errors.nama ? "border-failed" : "border-secondary-100"
          }`}
        />
        {errors.nama && (
          <span className="ml-9 mt-1 block text-start font-louis text-[12px] text-failed">
            Nama toko tidak boleh kosong
          </span>
        )}
        <p className="ml-9 mt-6 mr-auto text-start text-sm text-secondary-100">
          Deskripsi Toko
        </p>
        <textarea
          {...register("deskripsi")}
          autoComplete={"off"}
          className="w-[80%] border-b border-secondary-100 bg-transparent py-1 font-louis text-[14px] font-light text-others-white duration-500 focus:h-[100px] focus:border-b focus:border-others-white focus:outline-none"
        />
      </div>
      {/* ini navbar tapi ikut kegeser */}
      <Nav prevFormStep={prevFormStep} nextFormStep={nextFormStep} />
    </form>
  );
}
