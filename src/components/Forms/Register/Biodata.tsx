import { useRouter } from "next/router";
import { useForm, UseFormSetValue } from "react-hook-form";
import { api } from "../../../utils/api";
import { useState } from "react";
import { useFormData } from "../../../context/FormContext";
import "@fortawesome/fontawesome-free/css/all.css";
import type { SignUpFormValues } from "../../../pages/auth/signup";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Map from "../../Map";
import MapboxMap from "../../Map";
import { FieldValues } from "react-hook-form/dist/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Biodata({
  prevFormStep,
  formStep,
}: {
  prevFormStep: () => void;
  formStep: number;
}) {
  const { data, setFormValues } = useFormData<SignUpFormValues>();
  const [error, setError] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<SignUpFormValues>();
  const router = useRouter();
  const signUp = api.auth.signUp.useMutation();
  const signUpHandler = (values: SignUpFormValues) => {
    signUp
      .mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        email: data.email,
        password: data.password,
        telepon: values.telepon,
        alamat: values.alamat,
      })
      .then(async () => {
        setFormValues({});
        return await router.push("/auth/signin");
      })
      .catch((err) => {
        console.log(err);
        const reset = setTimeout(() => {
          signUp.reset();
        }, 3000);

        return () => clearTimeout(reset);
      });
  };
  const [click, setClick] = useState(false);
  const toggleMapVisibility = () => {
    setClick((prev) => !prev);
  };
  const [lng, setLng] = useState(110);
  const [lat, setLat] = useState(-7);
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState("");

  {
    return (
      <form
        onSubmit={handleSubmit(signUpHandler)}
        hidden={formStep != 1}
        className="h-full"
      >
        <div className="relative z-0 mb-2 font-louis">
          <input
            {...register("firstName", { required: true })}
            type="text"
            className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
            Nama Depan
          </label>
          {errors?.firstName?.type === "required" && (
            <span className="text-[12px] text-[#F51C2F]" role="alert">
              Wajib diisi
            </span>
          )}
        </div>
        <div className="relative z-0 mb-2 font-louis">
          <input
            {...register("lastName", { required: true })}
            type="text"
            className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
            Nama Belakang
          </label>
          {errors.lastName && errors.lastName.type === "required" && (
            <span className="text-[12px] text-[#F51C2F]" role="alert">
              Wajib diisi
            </span>
          )}
        </div>
        <div className="flex flex-row items-center justify-between gap-x-6">
          <select
            id="myDropdown"
            name="myDropdown"
            className="w-[8vh] bg-transparent p-2 text-sm text-others-white"
          >
            <option value="option1">+62</option>
            <option value="option2">+1</option>
            <option value="option3">+45</option>
          </select>
          <div className="relative z-0 flex-grow font-louis">
            <input
              {...register("telepon", { required: true, minLength: 10 })}
              type="number"
              className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
              No Telepon
            </label>
            {errors.telepon && errors.telepon.type === "required" && (
              <span className="text-[12px] text-[#F51C2F]" role="alert">
                Wajib diisi
              </span>
            )}
            {errors.telepon && errors.telepon.type === "minLength" && (
              <span className="text-[12px] text-[#F51C2F]" role="alert">
                Minimal 10 digit
              </span>
            )}
          </div>
        </div>
        <div className="relative z-0 flex font-louis">
          <input
            {...register("alamat", { required: true, minLength: 10 })}
            type="text"
            className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 pr-5 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <i
            className="fas fa-location-dot absolute right-0 top-1/2 -translate-y-1/2 text-white"
            onClick={toggleMapVisibility}
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
            Alamat
          </label>
        </div>
        {errors.alamat && errors.alamat.type === "required" && (
          <span className="text-[12px] text-[#F51C2F]" role="alert">
            Wajib diisi
          </span>
        )}
        {errors.alamat && errors.alamat.type === "minLength" && (
          <span className="text-[12px] text-[#F51C2F]" role="alert">
            Minimal 10 karakter
          </span>
        )}
        <div
          className={
            click
              ? "relative mt-5 h-[60vh] w-full border-4 border-primary-300"
              : "hidden"
          }
        >
          <MapboxMap
            setCoord={setCoord}
            coord={coord}
            lat={lat}
            lng={lng}
            location={location}
            setLat={setLat}
            setLng={setLng}
            setLocation={setLocation}
            initialOptions={{}}
            checked={false} // keknya bakal checkbox use my location
            setValue={setValue as unknown as UseFormSetValue<FieldValues>}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              width={31}
              height={39}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.667 19.333c1.008 0 1.871-.359 2.59-1.078.719-.718 1.078-1.581 1.076-2.588 0-1.009-.359-1.872-1.078-2.59-.718-.72-1.581-1.078-2.588-1.077-1.009 0-1.872.36-2.59 1.078-.72.719-1.078 1.582-1.077 2.589 0 1.008.36 1.871 1.078 2.59.719.719 1.582 1.078 2.589 1.076zm0 18.334c-4.92-4.186-8.594-8.074-11.022-11.664C2.216 22.413 1 19.09 1 16.033 1 11.45 2.475 7.8 5.424 5.08 8.374 2.36 11.787 1 15.667 1s7.295 1.36 10.244 4.08c2.95 2.719 4.424 6.37 4.422 10.953 0 3.056-1.215 6.38-3.644 9.97-2.43 3.59-6.104 7.479-11.022 11.664z"
                fill="#F6C73B"
                stroke="#000"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-2 py-4">
          <label>
            <input
              type="checkbox"
              {...register("remember")}
              // checked={isChecked}
              // onChange={handleCheckboxChange}
              className="peer hidden"
              // style={{ display: "none" }} // hide default checkbox
            />
            <span // custom checkbox style
              className={
                "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white peer-checked:scale-[0.8] peer-checked:bg-[#F4B829]  peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
              }
            />
          </label>
          <span className="font-louis text-[10px] text-white">
            Gunakan lokasi anda sekarang
          </span>
        </div>
        <div className="flex flex-row items-center gap-x-2 pb-4">
          <label>
            <input
              type="checkbox"
              {...register("remember", { required: true })}
              // checked={isChecked}
              // onChange={handleCheckboxChange}
              className="peer hidden"
              // style={{ display: "none" }} // hide default checkbox
            />
            <span // custom checkbox style
              className={
                "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white peer-checked:scale-[0.8] peer-checked:bg-[#F4B829]  peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
              }
            />
          </label>
          <span className="font-louis text-[10px] text-white">
            Setuju dengan{" "}
            <span className="font-italic italic text-[#F4B829]">Terms</span> dan{" "}
            <span className="font-italic italic text-[#F4B829]">
              Privacy Policy
            </span>{" "}
            kami.
          </span>
          <span className="text-failed">*</span>
        </div>
        {errors.remember && errors.remember.type === "required" && (
          <span className="text-[12px] text-[#F51C2F]" role="alert">
            Wajib diisi
          </span>
        )}
        {signUp.error && (
          <span className="mx-auto text-[12px] text-[#F51C2F]">
            {signUp.error.message}
          </span>
        )}
        <div className="flex flex-row items-center justify-between">
          <button className="font-louis text-[#F4B829]" onClick={prevFormStep}>
            Kembali
          </button>{" "}
          <button
            type="submit"
            className="h-[6vh] w-1/2 rounded-md bg-[#F4B829] font-louis"
            onClick={() => router.push("/auth/signin")}
          >
            Daftar
          </button>
        </div>
      </form>
    );
  }
}
