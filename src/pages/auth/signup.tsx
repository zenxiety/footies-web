/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { hashPassword } from "../../utils/auth";
import logo from "../../../public/icon-512x512.png";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
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
  const signUp = api.auth.signUp.useMutation();
  const value = null;
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
    <div className="relative h-screen w-full overflow-hidden bg-[#141313] p-12">
      <Image src={logo} alt="logo" className="w-[10vh]" />
      <h1 className="py-12 font-literata text-xl text-[#F4B829]">
        Buat akun Footies anda
      </h1>
      <form
        onSubmit={handleSubmit(signUpHandler)}
        className="flex flex-col gap-y-2 pb-2"
      >
        <h1 className={value == null ? "hidden" : "font-louis text-[#635E5E]"}>
          Email
        </h1>
        <input
          type="email"
          {...register("email")}
          className={
            "h-[6vh] w-full border-b-2 bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
          }
          placeholder="Email"
        />
        <h1 className={value == null ? "hidden" : "font-louis text-[#635E5E]"}>
          Kata Sandi
        </h1>
        <input
          type="password"
          {...register("password")}
          className={
            "h-[6vh] w-full border-b-2 bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
          }
          placeholder="Kata Sandi"
        />
        <h1 className={value == null ? "hidden" : "font-louis text-[#635E5E]"}>
          Kata Sandi
        </h1>
        <input
          type="password"
          {...register("password")}
          className={
            "h-[6vh] w-full border-b-2 bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
          }
          placeholder="Konfirmasi Kata Sandi"
        />
        <h1 className="text-[10px] text-[#635E5E]">
          Kata sandi harus memuat 8 karakter, huruf kapital, dan angka.
        </h1>
        <div className="flex flex-row gap-x-2">
          <input type="checkbox" value="Paneer" className="text-white" />
          <span className="font-louis text-[12px] text-white">
            Perlihatkan kata sandi
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Link href="/auth/signin">
            <h1 className="font-louis text-[#F4B829]">Masuk</h1>
          </Link>

          <Link href="/auth/biodata">
            <button
              type="submit"
              className="h-[6vh] rounded-md bg-[#F4B829] px-3 font-louis"
            >
              Selanjutnya
            </button>
          </Link>
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
  );
};

export default SignUp;
