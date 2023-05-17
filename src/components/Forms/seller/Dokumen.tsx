import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { useFormData } from "../../../context/FormContext";
import { SellerFormValues } from "../../../pages/auth/signup/seller";
import { api } from "../../../utils/api";
import { uploadImage } from "../../../utils/cloudinary";
import Nav from "../Nav";

export default function Dokumen({
  prevFormStep,
  formStep,
  nextFormStep,
}: {
  prevFormStep: () => void;
  formStep: number;
  nextFormStep: () => void;
}) {
  const { data, setFormValues } = useFormData<SellerFormValues>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<SellerFormValues>({ mode: "all" });
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
              setValue("dokumen", url as string, { shouldValidate: true });
            })
            .catch((e) => console.log(e));
        },
        [setValue]
      ),
      maxFiles: 1,
    });

  const signUp = api.auth.registerMerchant.useMutation();
  const router = useRouter();

  const onSubmit = async (values: SellerFormValues) => {
    await signUp
      .mutateAsync({
        alamat: data.alamat,
        deskripsi: data.deskripsi,
        dokumen: values.dokumen,
        jamBuka: data.jamBuka,
        jamTutup: data.jamTutup,
        labels: data.labels ?? ["BBC"],
        nama: data.nama,
      })
      .then(async () => {
        setFormValues({});
        await getSession();
        await router.push("/dashboard");
        nextFormStep();
      })
      .catch((e) => console.log(e));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`relative flex flex-col items-center justify-between pt-20`}
    >
      <div className="z-10 mx-auto w-screen xs:max-w-[500px]">
        <p className="mb-5">Verifikasi Dokumen</p>
        <div className="mx-8">
          <div className="w-full">
            <Image
              src="/signup/dokumen.png"
              alt=""
              width={150}
              height={85}
              className=" w-full rounded-md border-[5px] border-primary-300"
            />
          </div>
          <div className="">
            <p
              className={`mt-10 mb-1 mr-auto text-start text-[15px] font-medium  duration-500
          ${getValues("dokumen") ? "text-primary-300" : "text-secondary-100"}`}
            >
              Unggah Dokumen <span className="text-failed">*</span>
            </p>
            <p className="mb-1 mr-auto text-start font-louis text-[12px] font-medium  text-others-white">
              Dokumen kepemilikan bisnis/bangunan
            </p>
            <Controller
              control={control}
              name="dokumen"
              rules={{
                required: "Dokumen wajib diunggah",
              }}
              render={({ field: { onChange }, fieldState }) => (
                <>
                  <div
                    {...getRootProps()}
                    className="relative mt-3 flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-md border border-dashed"
                  >
                    <input type="file" {...getInputProps({ onChange })} />
                    {getValues("dokumen") != null ? (
                      <>
                        <div className="overflow-hidden rounded-md">
                          <Image
                            src={`${getValues("dokumen")}`}
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
                        width={41}
                        height={33}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.613 27.471a5 5 0 01-5 5h-3.325c-2.806 0-5.204-1.05-7.193-3.15-1.99-2.1-2.983-4.666-2.982-7.7 0-2.6.724-4.916 2.174-6.95 1.449-2.033 3.345-3.333 5.688-3.9.771-3.066 2.313-5.55 4.625-7.45 2.313-1.9 4.934-2.85 7.863-2.85 3.607 0 6.668 1.359 9.181 4.076 2.514 2.718 3.77 6.026 3.769 9.924 2.127.267 3.893 1.259 5.296 2.976 1.404 1.718 2.105 3.726 2.104 6.024 0 2.5-.81 4.626-2.43 6.376-1.619 1.751-3.584 2.626-5.895 2.624h-5.175a5 5 0 01-5-5v-9.3l2.96 3.1 2.59-2.8-7.4-8-7.4 8 2.59 2.8 2.96-3.1v9.3z"
                          fill="#EFEFEF"
                        />
                      </svg>
                    )}
                    {getValues("dokumen") != null ? (
                      <button
                        type="button"
                        onClick={open}
                        className={`absolute bottom-4 right-4 rounded-full bg-primary-300`}
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
                        Telusuri
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
            {signUp.isError && (
              <p className="mt-2 text-[12px] text-failed">
                {signUp.error?.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <Nav prevFormStep={prevFormStep} />
    </form>
  );
}
