/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../../utils/api";
import logo from "../../../public/icon-512x512.png";
import { FormValues, useFormData } from "../../context/seller";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Nav from "./Nav"
import "@fortawesome/fontawesome-free/css/all.css";
import FormProvider from "../../context/seller";

export default function SignUp({
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
      watch,
      formState: { errors },
      register,
    } = useForm<FormValues>();
  
    const onSubmit = (values: FormValues) => {
      console.log(values);
      setFormValues(values);
      nextFormStep();
    };
    const passDigital = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    );
    const passDigital1 = new RegExp(
      "[a-z,0-9,A-Z]+[@,.]+[a-z,0-9,A-Z]+[.]+[a-z,0-9,A-Z]"
    );
    const Submit = (data: any) => console.log(data);
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
    {
        return(
            <form onSubmit={handleSubmit(onSubmit)} hidden={formStep != 1}>
            <div className="relative z-0 mb-2 font-louis">
              <input
                {...register("email", {
                  required: true,
                  pattern: passDigital1,
                })}
                type="email"
                className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
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
                className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
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
              </div>  
              <Nav prevFormStep={prevFormStep} />
            
            <div className="my-4 flex flex-row items-center justify-center">
              <div className="border-t-2 text-white" />
              <h1 className="font-louis text-[12px] text-white">
                atau masuk dengan
              </h1>
              <div className="border-t-2 text-white" />
            </div>
          </form>
        )
    }
}