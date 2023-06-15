import Image from "next/image";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
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

  const onSubmit = (values: DriverFormValues) => {
    const finalPlate = plate.join(" ").toLowerCase();
    setValue("platNomor", finalPlate);
    signUp
      .mutateAsync({
        ...data,
        ...values,
      })
      .then((res) => {
        nextFormStep();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<DriverFormValues>({ mode: "all" });

  const plate: string[] = [];

  const handlePlateFirst = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    plate[0] = e.target.value;
    console.log(plate);
  };
  const handlePlateNum = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.value.length > 4) {
      e.currentTarget.value = e.currentTarget.value.slice(0, 4);
    }
    plate[1] = e.target.value;
    console.log(plate);
  };
  const handlePlateLast = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    plate[2] = e.target.value;
    console.log(plate);
  };

  const test = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px relative z-10 w-screen pt-20 xs:max-w-[500px]"
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
        <h4
          className={`text-base duration-500 ${
            getValues("platNomor") ? "text-primary-300" : "text-secondary-100"
          }`}
        >
          Nomor Pelat Kendaraan <span className="text-failed">*</span>
        </h4>
        <div className="mx-auto mt-[.25em] flex justify-center gap-x-4 px-14">
          <input
            // {...register("platNomor", { required: true })}
            type="text"
            onChange={(e) => handlePlateFirst(e)}
            className="w-[10%] border-b border-others-white bg-transparent text-center font-louis text-base font-normal uppercase text-others-white focus:outline-none"
            maxLength={2}
            autoComplete="off"
            placeholder="XX"
          />
          <input
            // {...register("platNomor", { required: true })}
            type="number"
            onChange={(e) => handlePlateNum(e)}
            className="w-[22%] border-b border-others-white bg-transparent text-center font-louis text-base font-normal text-others-white focus:outline-none"
            autoComplete="off"
            placeholder="0000"
          />
          <input
            // {...register("platNomor", { required: true })}
            type="text"
            onChange={(e) => handlePlateLast(e)}
            className="w-[15%] border-b border-others-white bg-transparent text-center font-louis text-base font-normal uppercase text-others-white focus:outline-none"
            maxLength={3}
            autoComplete="off"
            placeholder="XXX"
          />
        </div>
        <button type="button" onClick={(e) => test(e)}>
          Test
        </button>
        <h4
          className={`mt-[1em] text-base duration-500 ${
            getValues("merk") ? "text-primary-300" : "text-secondary-100"
          }`}
        >
          Merk <span className="text-failed">*</span>
        </h4>
        <input
          {...register("merk", { required: true })}
          type="text"
          className="inline-block w-[15%] max-w-[20%] overflow-auto border-b border-secondary-100 bg-transparent py-[1px] text-center font-louis text-base font-normal text-others-white focus:outline-none"
        />
        <h4
          className={`mt-[1em] text-base duration-500 ${
            getValues("tipeKendaraan")
              ? "text-primary-300"
              : "text-secondary-100"
          }`}
        >
          Tipe <span className="text-failed">*</span>
        </h4>
        <input
          {...register("tipeKendaraan", { required: true })}
          type="text"
          className="inline-block w-[15%] max-w-[20%] overflow-auto border-b border-secondary-100 bg-transparent py-[1px] text-center font-louis text-base font-normal text-others-white focus:outline-none"
        />

        <h4
          className={`mt-[1em] text-base duration-500 ${
            getValues("tahunProduksi")
              ? "text-primary-300"
              : "text-secondary-100"
          }`}
        >
          Tahun Produksi <span className="text-failed">*</span>
        </h4>
        <input
          {...register("tahunProduksi", { required: true })}
          type="tel"
          // pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
          // max={4}
          maxLength={4}
          className="mb-12 inline-block w-[15%] max-w-[20%] overflow-auto border-b border-secondary-100 bg-transparent py-[1px] text-center font-louis text-base font-normal text-others-white focus:outline-none"
        />
        {signUp.isError && (
          <p className="mt-2 text-[12px] text-failed">
            {signUp.error?.message}
          </p>
        )}
        <Nav prevFormStep={prevFormStep} />
      </form>
    </>
  );
}
