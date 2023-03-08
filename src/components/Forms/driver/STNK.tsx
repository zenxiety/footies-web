import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { useFormData } from "../../../context/FormContext";
import { DriverFormValues } from "../../../pages/auth/signup/driver";
import { uploadImage } from "../../../utils/cloudinary";
import Nav from "../Nav";

export default function STNK({
  prevFormStep,
  formStep,
  nextFormStep,
}: {
  prevFormStep: () => void;
  formStep: number;
  nextFormStep: () => void;
}) {
  const { setFormValues } = useFormData();

  const onSubmit = (values: DriverFormValues) => {
    setFormValues(values);
    nextFormStep();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
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
              setValue("stnk", url as string, { shouldValidate: true });
            })
            .catch((e) => console.log(e));
        },
        [setValue]
      ),
      maxFiles: 1,
    });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 flex min-h-screen w-screen flex-col items-center justify-between px-8 pt-20 xs:max-w-[500px]"
      >
        <div>
          <h3 className="px-4">Surat Tanda Nomor Kendaraan (STNK)</h3>
          <div className="z-[5] mx-auto mt-8 w-fit rounded-md border-[6px] border-primary-300 bg-white/10">
            <Image src="/signup/stnk.png" alt="" width={260} height={170} />
          </div>
          <p className="mt-10 mb-1 mr-auto text-start text-[15px] font-medium  text-others-white">
            Unggah foto <span className="text-failed">*</span>
          </p>
          <Controller
            control={control}
            name="stnk"
            rules={{
              required: "Dokumen wajib diunggah",
            }}
            render={({ field: { onChange }, fieldState }) => (
              <>
                <div
                  {...getRootProps()}
                  className="mt-3 flex h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed"
                >
                  <input type="file" {...getInputProps({ onChange })} />
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
                  <button
                    type="button"
                    onClick={open}
                    className="mt-2 rounded-full bg-primary-300 px-4 py-[6px] font-louis text-[14px] font-bold text-secondary-500"
                  >
                    Telusuri
                  </button>
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
        <Nav prevFormStep={prevFormStep} />
      </form>
    </>
  );
}
