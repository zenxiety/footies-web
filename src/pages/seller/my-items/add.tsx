import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { uploadImage } from "../../../utils/cloudinary";
import { DriverFormValues } from "../../auth/signup/driver";

export default function Add() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<DriverFormValues>({ mode: "all" });

  const { getRootProps, getInputProps, isDragActive, open, fileRejections } =
    useDropzone({
      noClick: true,
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
      },
      onDrop: useCallback(
        (acceptedFiles: File[]) => {
          uploadImage(acceptedFiles[0] as File)
            .then((url) => {
              setValue("sim", url as string, { shouldValidate: true });
            })
            .catch((e) => console.log(e));
        },
        [setValue]
      ),
      maxFiles: 1,
    });

  const [descLength, setDescLength] = useState(0);

  const countWord = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value.length);
    const len = e.target.value.length;
    setDescLength(() => len);
    console.log(descLength);
  };

  return (
    <>
      <Head>
        <title>Add Item - Footies</title>
      </Head>
      <section className="min-h-screen bg-secondary-500 px-8 py-[2.5vh] font-louis text-others-white">
        {/* Back Button & Page Title */}
        <div className={`flex items-center`}>
          <Link href="./">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.875 19.3L4.27502 12.7C4.17502 12.6 4.10402 12.4917 4.06202 12.375C4.02002 12.2583 3.99935 12.1333 4.00002 12C4.00002 11.8667 4.02102 11.7417 4.06302 11.625C4.10502 11.5083 4.17568 11.4 4.27502 11.3L10.875 4.7C11.0583 4.51667 11.2877 4.421 11.563 4.413C11.8383 4.405 12.0757 4.50067 12.275 4.7C12.475 4.88333 12.5793 5.11267 12.588 5.388C12.5967 5.66333 12.5007 5.90067 12.3 6.1L7.40002 11H18.575C18.8583 11 19.096 11.096 19.288 11.288C19.48 11.48 19.5757 11.7173 19.575 12C19.575 12.2833 19.4793 12.521 19.288 12.713C19.0967 12.905 18.859 13.0007 18.575 13H7.40002L12.3 17.9C12.4833 18.0833 12.5793 18.3167 12.588 18.6C12.5967 18.8833 12.5007 19.1167 12.3 19.3C12.1167 19.5 11.8833 19.6 11.6 19.6C11.3167 19.6 11.075 19.5 10.875 19.3Z"
                fill="#D3D3D3"
              />
            </svg>
          </Link>
          <span className="ml-3 text-others-white">Tambah Menu</span>
        </div>
        {/* Unggah Foto Menu */}
        <div className="mt-[4vh] px-10 text-center">
          <h2 className="font-literata">
            Unggah Foto Menu<span className="ml-1 text-failed">*</span>
          </h2>
          <Controller
            control={control}
            name="sim"
            rules={{
              required: "Foto SIM wajib diunggah",
            }}
            render={({ field: { onChange }, fieldState }) => (
              <>
                <div
                  {...getRootProps()}
                  className="relative mt-3 flex h-[180px] w-full flex-col items-center justify-center overflow-hidden rounded-md border border-dashed p-1"
                >
                  <input type="file" {...getInputProps({ onChange })} />
                  {getValues("sim") != null ? (
                    <>
                      <div className="overflow-hidden rounded-md">
                        <Image
                          src={`${getValues("sim")}`}
                          alt=""
                          width={300}
                          height={200}
                          className="h-full w-auto"
                        />
                      </div>
                      <div className="absolute bottom-0 h-[50px] w-full bg-gradient-to-b from-transparent to-black"></div>
                    </>
                  ) : (
                    <svg
                      width={30}
                      height={27}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="scale-125"
                    >
                      <path
                        d="M27.913 17.36l-4.963 1.806-4.467-1.788a1.5 1.5 0 00-1.116 0l-4.442 1.777-4.443-1.777a1.5 1.5 0 00-1.07-.018l-5.5 2a1.5 1.5 0 101.026 2.82l1.014-.368a5.508 5.508 0 005.473 4.958h12a5.506 5.506 0 005.5-5.5v-.358l2.012-.732a1.5 1.5 0 10-1.024-2.82zm-6.488 6.41h-12a2.5 2.5 0 01-2.5-2.5v-.54l.975-.355 4.467 1.788a1.5 1.5 0 001.115 0l4.443-1.777 4.442 1.777a1.5 1.5 0 001.07.017l.362-.132a2.499 2.499 0 01-2.374 1.723zm-20.5-9.5a1.5 1.5 0 011.5-1.5h26a1.5 1.5 0 010 3h-26a1.5 1.5 0 01-1.5-1.5zm4.525-3H25.4a2.546 2.546 0 002.048-1.036 2.45 2.45 0 00.36-2.206C26.44 3.756 21.348.771 15.425.771 9.501.77 4.411 3.754 3.042 8.027a2.445 2.445 0 00.36 2.206A2.54 2.54 0 005.45 11.27zm9.975-7.5c4.212 0 7.951 1.857 9.25 4.5h-18.5c1.3-2.643 5.039-4.5 9.25-4.5z"
                        fill="#EFEFEF"
                      />
                    </svg>
                  )}
                  {getValues("sim") != null ? (
                    <button
                      type="button"
                      onClick={open}
                      className={`absolute top-2 right-2 scale-90 rounded-full bg-primary-300`}
                    >
                      <svg
                        width={37}
                        height={37}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 23.252v3.75h3.75l11.06-11.06-3.75-3.75L9 23.252zm17.71-11.62l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.997.997 0 000-1.41z"
                          fill="#1d1d1d"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={open}
                      className={`mt-2 rounded-full bg-primary-300 px-4 py-[6px] font-louis text-[14px] font-bold text-secondary-500 duration-500`}
                    >
                      Unggah
                    </button>
                  )}
                </div>
                <div>
                  {fieldState.error && (
                    <span
                      role="alert"
                      className="font-louis text-base text-failed"
                    >
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              </>
            )}
          />
        </div>
        {/* Nama Menu */}
        <div>
          <p className="mt-3 mr-auto text-start font-literata font-medium text-secondary-100">
            Nama Menu <span className="text-failed">*</span>
          </p>
          <input
            // {...register("alamat", {
            //   required: "Alamat Toko tidak boleh kosong",
            // })}
            // value={getValues("alamat")}
            autoComplete={"off"}
            type="text"
            className={`w-full text-ellipsis border-b bg-transparent py-2 font-louis text-[18px] font-light text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none ${
              "border-others-white"
              // errors.alamat ? "border-failed" : "border-secondary-100"
            }`}
          />
          {/* {errors.alamat && (
            <span className="mt-[1em] block text-start font-louis text-[12px] text-failed">
              Alamat toko tidak boleh kosong
            </span>
          )} */}
        </div>
        {/* Harga */}
        <div>
          <p className="mt-5 mr-auto text-start font-literata font-medium text-secondary-100">
            Harga <span className="text-failed">*</span>
          </p>
          <input
            // {...register("alamat", {
            //   required: "Alamat Toko tidak boleh kosong",
            // })}
            // value={getValues("alamat")}
            autoComplete={"off"}
            type="text"
            className={`w-full text-ellipsis border-b bg-transparent py-2 font-louis text-[18px] font-light text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none ${
              "border-others-white"
              // errors.alamat ? "border-failed" : "border-secondary-100"
            }`}
          />
          {/* {errors.alamat && (
            <span className="mt-[1em] block text-start font-louis text-[12px] text-failed">
            Alamat toko tidak boleh kosong
            </span>
          )} */}
        </div>
        {/* Deskripsi */}
        <div>
          <p className="mt-5 mr-auto text-start font-literata font-medium text-secondary-100">
            Deskripsi
          </p>
          <div className="relative">
            <textarea
              // {...register("alamat", {
              //   required: "Alamat Toko tidak boleh kosong",
              // })}
              // value={getValues("alamat")}
              onChange={(e) => countWord(e)}
              autoComplete={"off"}
              maxLength={150}
              className={`mt-2 h-[120px] w-full rounded-md border bg-transparent p-2 text-justify font-louis text-[18px] font-light text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none ${
                "border-others-white"
                // errors.alamat ? "border-failed" : "border-secondary-100"
              }`}
            />
            <span className="absolute bottom-2 right-2 rounded-sm bg-secondary-500 pl-1 text-sm tracking-wide text-secondary-300">
              <span className={descLength >= 150 ? "text-failed" : ""}>
                {descLength}/
              </span>
              <span className="text-failed">150</span>
            </span>
          </div>
          {/* {errors.alamat && (
            <span className="mt-[1em] block text-start font-louis text-[12px] text-failed">
            Alamat toko tidak boleh kosong
            </span>
          )} */}
        </div>
        {/* Diskon & Harga Akhir */}
        <div className="flex">
          <div className="">
            <p className="mt-5 mr-auto text-start font-literata font-medium text-secondary-100">
              Diskon
            </p>
            <input
              // {...register("alamat", {
              //   required: "Alamat Toko tidak boleh kosong",
              // })}
              // value={getValues("alamat")}
              autoComplete={"off"}
              type="text"
              maxLength={3}
              className={`relative w-1/2 text-ellipsis border-b bg-transparent py-1 font-louis text-[18px] font-light text-others-white duration-500 focus:border-b focus:border-others-white focus:outline-none ${
                "border-others-white"
                // errors.alamat ? "border-failed" : "border-secondary-100"
              }`}
            />
            {/* {errors.alamat && (
            <span className="mt-[1em] block text-start font-louis text-[12px] text-failed">
            Alamat toko tidak boleh kosong
            </span>
          )} */}
          </div>
          {/* Harga Akhir */}
          <div className="mt-5 text-secondary-100">
            <p>Harga Akhir</p>
            <span>Rp45000</span>
          </div>
        </div>
        {/* Opsi Menu */}
        <div>
          <p className="mt-5 mr-auto text-start font-literata font-medium text-others-white">
            Opsi Menu
          </p>
          {/* Tambahkan Opsi */}
          <button type="button" className="mt-3 flex items-center gap-x-2">
            <svg
              width={24}
              height={24}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.903 17.808c.32 0 .59-.109.806-.326.217-.216.325-.485.325-.805v-3.393h3.42c.32 0 .585-.108.792-.325.207-.216.311-.485.311-.805 0-.32-.109-.59-.326-.806a1.093 1.093 0 00-.805-.325h-3.392v-3.42c0-.321-.108-.585-.325-.792a1.123 1.123 0 00-.806-.311c-.32 0-.589.108-.805.324a1.095 1.095 0 00-.326.807v3.392h-3.42c-.32 0-.585.108-.792.325a1.122 1.122 0 00-.311.806c0 .32.108.588.325.805.217.217.485.325.806.325h3.392v3.421c0 .32.109.584.326.792.216.207.485.31.805.31zm0 5.654c-1.564 0-3.034-.297-4.41-.891a11.41 11.41 0 01-3.59-2.417 11.41 11.41 0 01-2.417-3.59 11.005 11.005 0 01-.891-4.41c0-1.565.297-3.035.891-4.41a11.412 11.412 0 012.417-3.59 11.427 11.427 0 013.59-2.418 11.017 11.017 0 014.41-.89c1.564 0 3.034.296 4.41.89 1.376.594 2.573 1.4 3.59 2.417a11.412 11.412 0 012.417 3.59c.594 1.376.891 2.846.891 4.41 0 1.565-.297 3.035-.891 4.41a11.41 11.41 0 01-2.417 3.591 11.41 11.41 0 01-3.59 2.417 11.006 11.006 0 01-4.41.89zm0-2.262c2.507 0 4.641-.88 6.404-2.642 1.762-1.763 2.642-3.898 2.642-6.404 0-2.507-.88-4.641-2.642-6.404-1.763-1.762-3.897-2.643-6.404-2.643S7.263 3.988 5.5 5.75c-1.762 1.763-2.643 3.897-2.643 6.404 0 2.506.88 4.64 2.643 6.404 1.762 1.761 3.896 2.642 6.403 2.642z"
                fill="#F6C73B"
              />
            </svg>
            <span className="font-literata text-sm text-primary-300">
              Tambahkan Opsi
            </span>
          </button>
          <button
            type="submit"
            className="ml-auto block rounded-full bg-primary-300 px-4 pb-2 pt-1 font-literata text-base font-medium text-secondary-500"
          >
            Simpan
          </button>
        </div>
      </section>
    </>
  );
}
