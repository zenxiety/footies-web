/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import logo from "../../../public/icon-512x512.png";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import "@fortawesome/fontawesome-free/css/all.css";
import Nav from "../../components/Register/Nav";
import Biodata from "../../components/Register/Biodata"
import FormProvider from "../../context/seller";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telepon: string;
  alamat: string;
  confirmPassword: string;
  remember?: boolean;
  apiError?: string;
};

const SignUp: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });
  const passDigital = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  );
  const passDigital1 = new RegExp(
    "[a-z,0-9,A-Z]+[@,.]+[a-z,0-9,A-Z]+[.]+[a-z,0-9,A-Z]"
  );
  const onSubmit = (data: any) => console.log(data);
  const router = useRouter();
  const signUp = api.auth.signUp.useMutation();
  const [biodata, setBiodata] = useState(false);
  // const [biodata1, setBiodata1] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState({
    firstPassword: '',
    secondPassword: ''
  })
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleBiodata = () => {
    if (watch("email") && watch("password") && watch("confirmPassword")) {
      setBiodata((prev) => !prev);
    }
  };
  const signUpHandler = (data: FormValues) => {
    signUp
      .mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        telepon: data.telepon,
        alamat: data.alamat,
      })
      .then(async () => {
        return await router.push("/auth/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        className={
          "relative h-screen w-full overflow-hidden bg-secondary-500 p-12"
        }
      >
        <Image src={logo} alt="logo" className="w-[10vh]" />
        <h1 className="py-12 font-literata text-[23.7px] text-primary-300">
          {biodata ? "Isi data diri anda" : "Buat akun Footies anda"}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUpHandler(watch());
            handleSubmit(onSubmit);
          }}
          className="flex flex-col gap-y-2 pb-2"
        >
          <div className={biodata ? "" : "hidden"}>
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
                  This is required
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
                  This is required
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
                  {...register("telepon", { required: true, maxLength: 30 })}
                  type="number"
                  className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
                  No Telepon
                </label>
                {errors.telepon && errors.telepon.type === "required" && (
                  <span className="text-[12px] text-[#F51C2F]" role="alert">
                    This is required
                  </span>
                )}
              </div>
            </div>
            <div className="relative z-0 flex font-louis">
              <input
                {...register("alamat", { required: true, maxLength: 30 })}
                type="text"
                className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 pr-5 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <i className="fas fa-location-dot absolute right-0 top-1/2 -translate-y-1/2 text-white" />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
                Alamat
              </label>
              
            </div>
            {errors.alamat && errors.alamat.type === "required" && (
                <span className="text-[12px] text-[#F51C2F]" role="alert">
                  This is required
                </span>
              )}
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
                Setuju dengan{" "}
                <span className="font-italic text-[#F4B829]">Terms</span> dan{" "}
                <span className="font-italic text-[#F4B829]">
                  Provacy Policy
                </span>{" "}
                kami.
              </span>
            </div>
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-louis text-[#F4B829]" onClick={toggleBiodata}>
                Kembali
              </h1>

              <button
                type="submit"
                className="h-[6vh] w-1/2 rounded-md bg-[#F4B829] font-louis"
              >
                Daftar
              </button>
            </div>
          </div>
          <div className={biodata ? "hidden" : ""}>
            <div className="relative z-0 mb-2 font-louis">
              <input
                {...register("email", {
                  required: true,
                  pattern: passDigital1,
                })}
                type="email"
                className={`peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:outline-none focus:ring-0 ${errors.email ? "focus:border-red-500" : "focus:border-primary-300"}`}
                placeholder=" "
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
                Email
              </label>
              {errors?.email?.type === "required" && (
                <span className="text-[12px] text-[#F51C2F]">
                  This is required
                </span>
              )}
              {errors?.email?.type == "pattern" && (
                <span className="font-louis text-[12px] text-red-500">
                  Harus sesuai format!
                </span>
              )}
            </div>
            <div className="relative z-0 mb-2 font-louis">
              <input
                type={passwordVisible ? "text" : "password"}
                {...register("password", {
                  required: true,
                  pattern: passDigital,
                  minLength: 8,
                })}
                className={`peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:outline-none focus:ring-0 ${errors.password ? "focus:border-red-500" : "focus:border-primary-300"}`}
                placeholder=" "
                
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
                Kata Sandi
              </label>
              {errors.password && errors.password.type === "required" && (
                <span className="text-[12px] text-[#F51C2F]" role="alert">
                  This is required
                </span>
              )}
              {errors?.password?.type == "pattern" && (
                <span className="font-louis text-[12px] text-red-500">
                  Kata sandi harus memuat 8 karakter, huruf kapital, dan angka.
                </span>
              )}
              {errors?.password?.type == "minLength" && (
                <span className="font-louis text-[12px] text-red-500">
                  Minimal 8 karakter
                </span>
              )}
            </div>
            <div className="relative z-0 mb-2 font-louis">
              <input
                type={passwordVisible ? "text" : "password"}
                {...register("confirmPassword", {
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
                placeholder=" "
                
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
                Konfirmasi Kata Sandi
              </label>
              {errors.password && errors.password.type === "required" && (
                <span className="text-[12px] text-[#F51C2F]" role="alert">
                  This is required
                </span>
              )}
            </div>
            <h1 className="text-[10px] text-[#635E5E]">
              Kata sandi harus memuat 8 karakter, huruf kapital, dan angka.
            </h1>
            <div className="flex flex-row gap-x-2">
              <div className="my-4 flex flex-row items-center justify-center gap-x-2">
                <label>
                  <input
                    type="checkbox"
                    {...register("remember")}
                    // checked={isChecked}
                    // onChange={handleCheckboxChange}
                    className="peer hidden"
                    // style={{ display: "none" }} // hide default checkbox
                    onClick={togglePasswordVisibility}
                  />
                  <span // custom checkbox style
                    className={
                      "flex h-[20px] w-[20px] scale-100 items-center justify-center  rounded-[4px] bg-white peer-checked:scale-[0.8] peer-checked:bg-[#F4B829]  peer-checked:pt-0 peer-checked:outline-double peer-checked:outline-[#F4B829]"
                    }
                  />
                </label>
                <h1 className="font-louis text-white">
                  Perlihatkan kata sandi
                </h1>
              </div>
            </div>
            <div className="my-4 flex flex-row items-center justify-between">
              <Link href="/auth/signin">
                <h1 className="font-louis text-[#F4B829]">Masuk</h1>
              </Link>

              <button
                type="button"
                className="h-[6vh] cursor-pointer rounded-md bg-[#F4B829] px-3 font-louis"
                onClick={toggleBiodata}
              >
                Selanjutnya
              </button>
            </div>
            <div className="my-4 flex flex-row items-center justify-center">
              <div className="border-t-2 text-white" />
              <h1 className="font-louis text-[12px] text-white">
                atau masuk dengan
              </h1>
              <div className="border-t-2 text-white" />
            </div>
          </div>
        </form>
        {!biodata && (
          <button
            className="h-[6vh] w-full rounded-md bg-[#F4B829] font-louis"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: false,
              })
            }
          >
            Google
          </button>
        )}
      </div>
    </>
  );
};

export default SignUp;
