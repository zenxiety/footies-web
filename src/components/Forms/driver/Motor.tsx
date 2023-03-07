import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { useFormData } from "../../../context/FormContext";
import { DriverFormValues } from "../../../pages/auth/signup/driver";
import { api } from "../../../utils/api";
import { uploadImage } from "../../../utils/cloudinary";
import Nav from "../Nav";

export default function Motor({
  prevFormStep,
  formStep,
  nextFormStep,
}: {
  prevFormStep: () => void;
  formStep: number;
  nextFormStep: () => void;
}) {
  const { setFormValues, data } = useFormData<DriverFormValues>();
  const signUp = api.auth.registerMitra.useMutation();

  const onSubmit = async (values: DriverFormValues) => {
    await signUp.mutateAsync({
      ...data,
      ...values,
    });
    nextFormStep();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DriverFormValues>({ mode: "all" });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px relative z-10 h-screen w-screen pt-20 xs:max-w-[500px]"
      >
        <h3 className="mb-5 px-20">Informasi Kendaraan</h3>
        <Image
          src="/signup/motor.png"
          alt=""
          width={380}
          height={280}
          className={`mx-auto -mb-[4.5rem] w-full max-w-[500px] delay-[750ms] duration-500 ${
            formStep == 4 ? "" : "-translate-x-1/3 opacity-0"
          }`}
        />
        <h4 className="text-base">
          Nomor Pelat Kendaraan <span className="text-failed">*</span>
        </h4>
        <div className="mx-auto mt-[.25em] flex justify-center gap-x-4 px-14">
          <input
            {...register("platNomor", { required: true })}
            type="text"
            className="w-[10%] border-b border-others-white bg-transparent text-center font-louis text-base font-normal uppercase text-others-white focus:outline-none"
            maxLength={2}
            autoComplete="off"
            placeholder="XX"
          />
          <input
            type="tel"
            className="w-[22%] border-b border-others-white bg-transparent text-center font-louis text-base font-normal text-others-white focus:outline-none"
            maxLength={4}
            autoComplete="off"
            placeholder="0000"
          />
          <input
            type="text"
            className="w-[15%] border-b border-others-white bg-transparent text-center font-louis text-base font-normal uppercase text-others-white focus:outline-none"
            maxLength={3}
            autoComplete="off"
            placeholder="XXX"
          />
        </div>
        <h4 className="mt-[1em] text-base text-secondary-100">
          Merk <span className="text-failed">*</span>
        </h4>
        <input
          {...register("merk", { required: true })}
          type="text"
          className="inline-block w-[15%] max-w-[20%] overflow-auto border-b border-secondary-100 bg-transparent text-center font-louis text-base font-normal text-others-white focus:outline-none"
        />
        <h4 className="mt-[1em] text-base">
          Tipe <span className="text-failed">*</span>
        </h4>
        <input
          {...register("tipeKendaraan", { required: true })}
          type="text"
          className="inline-block w-[15%] max-w-[20%] overflow-auto border-b border-secondary-100 bg-transparent text-center font-louis text-base font-normal text-others-white focus:outline-none"
        />
        <h4 className="mt-[1em] text-base">
          Tahun Produksi <span className="text-failed">*</span>
        </h4>
        <input
          {...register("tahunProduksi", { required: true })}
          type="tel"
          // pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
          // max={4}
          maxLength={4}
          className="inline-block w-[15%] max-w-[20%] overflow-auto border-b border-secondary-100 bg-transparent text-center font-louis text-base font-normal text-others-white focus:outline-none"
        />
        <Nav prevFormStep={prevFormStep} />
      </form>
    </>
  );
}
