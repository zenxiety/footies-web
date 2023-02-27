/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import logo from "../../../public/icon-512x512.png";
import Image from "next/image";
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
              className={value == null ? "hidden" : "font-louis text-[#635E5E]"}
            >
              Email
            </h1>
            <input
              type="email"
              {...register("email")}
              className={
                value == null
                  ? "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white underline"
                  : "h-[6vh] w-full border-b-2 border-[#F4B829] bg-[#141313] text-white underline"
              }
              placeholder="Email"
            />
            <h1
              className={value == null ? "hidden" : "font-louis text-[#635E5E]"}
            >
              Kata Sandi
            </h1>
            <input
              type="password"
              {...register("password")}
              className={
                value == null
                  ? "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white underline"
                  : "h-[6vh] w-full border-b-2 border-[#F4B829] bg-[#141313] text-white underline"
              }
              placeholder="Kata Sandi"
            />

            <div className="flex flex-row justify-between">
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
            <h1 className="mx-auto block font-louis text-[8px] text-[#999999]">
              Belum punya akun?{" "}
              <span className="font-louis text-white">Daftar sekarang!</span>
            </h1>
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
        </div>
      </div>
    </>
  );
};

export default SignIn;
