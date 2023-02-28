/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../../utils/api";
import { hashPassword } from "../../utils/auth";
import logo from "../../../public/icon-512x512.png";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Biodata from "./biodata";
import "@fortawesome/fontawesome-free/css/all.css";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telepon: string;
  alamat: string;
  apiError?: string;
};

const SignUp: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();
  const value = null;
  const signUp = api.auth.signUp.useMutation();
  const [biodata, setBiodata] = useState(false);
  const [focus, setFocus] = useState(false);
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleBiodata = () => {
    setBiodata((prev) => !prev);
  };
  const toggleFocus = () => {
    setFocus((prev) => !prev);
  };
  const toggleFocus1 = () => {
    setFocus1((prev) => !prev);
  };
  const toggleFocus2 = () => {
    setFocus2((prev) => !prev);
  };
  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsChecked(event.target.checked);
  };
  const signUpHandler = (data: FormValues) => {
    signUp
      .mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashPassword(data.password),
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
          !biodata
            ? "relative h-screen w-full overflow-hidden bg-[#141313] p-12"
            : "hidden"
        }
      >
        <Image src={logo} alt="logo" className="w-[10vh]" />
        <h1 className="py-12 font-literata text-xl text-[#F4B829]">
          Buat akun Footies anda
        </h1>
        <form
          onSubmit={handleSubmit(signUpHandler)}
          className="flex flex-col gap-y-2 pb-2"
        >
          <h1
            className={
              !focus
                ? "absolute top-[215px] z-50 translate-y-12 text-[16px] text-[#635E5E] duration-500"
                : "absolute top-[248px] z-50 font-louis text-[10px] text-[#635E5E] duration-500 "
            }
          >
            Email
          </h1>
          <input
            type="email"
            {...register("email")}
            className={
              "h-[6vh] w-full border-b-2 bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
            }
            onClick={toggleFocus}
          />
          <h1
            className={
              !focus1
                ? "absolute top-[270px] z-50 translate-y-12 text-[16px] text-[#635E5E] duration-500"
                : "absolute top-[308px] z-50 font-louis text-[10px] text-[#635E5E] duration-500 "
            }
          >
            Kata Sandi
          </h1>
          <input
            type={passwordVisible ? "text" : "password"}
            {...register("password")}
            className={
              "h-[6vh] w-full border-b-2 bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
            }
            onClick={toggleFocus1}
          />
          <h1
            className={
              !focus2
                ? "absolute top-[325px] z-50 translate-y-12 text-[16px] text-[#635E5E] duration-500"
                : "absolute top-[365px] z-50 font-louis text-[10px] text-[#635E5E] duration-500 "
            }
          >
            Konfirmasi Kata Sandi
          </h1>
          <input
            type={passwordVisible ? "text" : "password"}
            {...register("password")}
            className={
              "h-[6vh] w-full border-b-2 bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
            }
            onClick={toggleFocus2}
          />
          <h1 className="text-[10px] text-[#635E5E]">
            Kata sandi harus memuat 8 karakter, huruf kapital, dan angka.
          </h1>
          <div className="flex flex-row gap-x-2">
            <div className="flex flex-row items-center justify-center gap-x-2">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  onClick={togglePasswordVisibility}
                  style={{ display: "none" }} // hide default checkbox
                />
                <span // custom checkbox style
                  className={
                    isChecked
                      ? "flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-[#F4B829] pt-0"
                      : "flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-white"
                  }
                />
              </label>
              <h1 className="font-louis text-white">Perlihatkan kata sandi</h1>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Link href="/auth/signin">
              <h1 className="font-louis text-[#F4B829]">Masuk</h1>
            </Link>

            <button
              type="submit"
              className="h-[6vh] rounded-md bg-[#F4B829] px-3 font-louis"
              onClick={toggleBiodata}
            >
              Selanjutnya
            </button>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="border-t-2 text-white" />
            <h1 className="font-louis text-[12px] text-white">
              atau masuk dengan
            </h1>
            <div className="border-t-2 text-white" />
          </div>
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
        </form>

        {/* <form onSubmit={handleSubmit(signUpHandler)}>
        <input type="text" {...register("name")} />
      <div>
      <form onSubmit={handleSubmit(signUpHandler)}>
        <input type="text" {...register("firstName")} />
        <input type="text" {...register("lastName")} />
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <input type="tel" {...register("telepon")} />
        <input type="text" {...register("alamat")} />
        <button type="submit">Signup</button>
      </form> */}
      </div>
      {biodata ? <Biodata /> : null}
    </>
  );
};

export default SignUp;
