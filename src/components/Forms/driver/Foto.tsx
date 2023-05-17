import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { useFormData } from "../../../context/FormContext";
import { DriverFormValues } from "../../../pages/auth/signup/driver";
import { uploadImage } from "../../../utils/cloudinary";
import Nav from "../Nav";

export default function Foto({
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
              setValue("profilePicture", url as string, {
                shouldValidate: true,
              });
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
        className="relative z-20 flex h-full w-screen flex-col items-center justify-between px-8 pt-20 xs:max-w-[500px]"
      >
        <div>
          <h3 className="px-10">Foto Profil Pengemudi</h3>
          <div className="mx-auto mt-8 w-fit overflow-hidden rounded-full border-[6px] border-primary-300 bg-white/10">
            <svg
              width={170}
              height={171}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity={0}
                d="M85 170.98c46.944 0 85-38.055 85-85 0-46.944-38.056-85-85-85s-85 38.056-85 85c0 46.945 38.056 85 85 85z"
                fill="#EFEFEF"
              />
              <path
                d="M84.999 42.881c-17.595 0-31.875 14.28-31.875 31.875 0 17.255 13.515 31.28 31.45 31.79H86.104c17.17-.595 30.685-14.535 30.77-31.79 0-17.595-14.28-31.875-31.875-31.875zM142.637 148.455c-15.13 13.94-35.36 22.525-57.63 22.525-22.27 0-42.5-8.585-57.63-22.525 2.04-7.735 7.565-14.79 15.64-20.23 23.205-15.47 60.945-15.47 83.98 0 8.16 5.44 13.6 12.495 15.64 20.23z"
                fill="#EFEFEF"
              />
            </svg>
          </div>
          <p
            className={`mt-10 mb-1 mr-auto text-start text-[15px] font-medium  duration-500
          ${
            getValues("profilePicture")
              ? "text-primary-300"
              : "text-secondary-100"
          }`}
          >
            Unggah foto <span className="text-failed">*</span>
          </p>
          <Controller
            control={control}
            name="profilePicture"
            rules={{
              required: "Foto profil wajib diunggah",
            }}
            render={({ field: { onChange }, fieldState }) => (
              <>
                <div
                  {...getRootProps()}
                  className={`relative mx-auto mt-3 flex h-[200px] flex-col items-center justify-center overflow-hidden rounded-md border border-dashed ${
                    getValues("profilePicture") != null ? "w-[200px]" : "w-full"
                  }`}
                >
                  <input type="file" {...getInputProps({ onChange })} />
                  {getValues("profilePicture") != null ? (
                    <>
                      <div className="overflow-hidden rounded-md">
                        <Image
                          src={`${getValues("profilePicture")}`}
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
                  {getValues("profilePicture") != null ? (
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
        </div>
        <Nav prevFormStep={prevFormStep} />
      </form>
    </>
  );
}
