/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import logo from "../../../public/icon-512x512.png";
import Image from "next/image";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState } from "react";
type FormValues = {
  email: string;
  password: string;
  apiError?: string;
};
const value = null;
const SignIn: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focus, setFocus] = useState(false);
  const [focus1, setFocus1] = useState(false);
  const toggleFocus = () => {
    setFocus((prev) => !prev);
  };
  const toggleFocus1 = () => {
    setFocus1((prev) => !prev);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const signinHandler = async (data: FormValues) => {
    const res = await signIn("credentials", {
      ...data,
      callbackUrl: "/",
      redirect: false,
    });

    console.log(res);
    if (res && !res?.error) return await router.push("/");
  };

  return (
    <>
      <div className="relative flex h-screen w-full flex-col justify-between bg-[#141313] p-12">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-x-4">
            <i className="fas fa-arrow-left text-white" />
            <h1 className="font-louis text-white">Masuk</h1>
          </div>
          <i className="fas fa-question text-white" />
        </div>
        <Image
          src={logo}
          className="mx-auto block w-[12vh] py-[8vh]"
          alt="logo"
        />
        <div>
          <form
            onSubmit={handleSubmit(signinHandler)}
            className="flex flex-col gap-y-2 pb-2"
          >
            <h1
              className={
                focus
                  ? "hidden"
                  : "absolute font-louis text-[10px] text-[#635E5E]"
              }
            >
              Email
            </h1>
            <input
              type="email"
              {...register("email")}
              className={
                "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
              }
              onClick={toggleFocus}
              placeholder="Email"
            />
            <div className="flex flex-col">
              <h1
                className={
                  !focus1 ? "hidden" : "font-louis text-[10px] text-[#635E5E]"
                }
              >
                Kata Sandi
              </h1>
              <div className="flex flex-row items-center justify-between border-b-2 border-[#d9d9d9] focus:border-[#F4B829]">
                <input
                  type={passwordVisible ? "text" : "password"}
                  {...register("password")}
                  className={
                    "h-[6vh] w-full bg-[#141313] text-white  focus:outline-none"
                  }
                  placeholder="Kata Sandi"
                  onClick={toggleFocus1}
                />
                <i
                  className={
                    passwordVisible
                      ? "fas fa-eye-slash text-[#F4B829]"
                      : "fas fa-eye text-[#F4B829]"
                  }
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>

            <div className="flex flex-row justify-between py-4">
              <div className="flex flex-row gap-x-2">
                <input type="checkbox" value="Paneer" className="text-white" />
                <span className="font-louis text-[12px] text-white">
                  Ingat saya
                </span>
              </div>
              <p className="font-louis text-[12px] text-[#F4B829]">
                Lupa kata sandi?
              </p>
            </div>
            <button
              type="submit"
              className="h-[6vh] w-full rounded-md bg-[#F4B829] font-louis"
            >
              Masuk
            </button>
            <div className="block mx-auto">
            <Link href="/auth/signup">
              <h1 className="mx-auto block font-louis text-[8px] text-[#999999]">
                Belum punya akun?{" "}
                <span className="font-louis text-white">Daftar sekarang!</span>
              </h1>
            </Link>
            </div>
            

            <div className="flex flex-row items-center justify-center">
              <div className="absolute border-t-2 border-white" />
              <h1 className="font-louis text-[12px] text-white">
                atau daftar dengan
              </h1>
              <div className="border-t-2 border-white" />
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
        </div>
      </div>
    </>
  );
};

export default SignIn;
