import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { useState } from "react";
import { hashPassword } from "../../utils/auth";
import logo from "../../../public/icon-512x512.png";
import Image from "next/image";
import Link from "next/link";
import SignUp from "./signup";
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

const Biodata: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();
  const signUp = api.auth.signUp.useMutation();
  const value = null;
  const [biodata, setBiodata] = useState(false);
  const toggleBiodata = () => {
    setBiodata((prev) => !prev);
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
      <div className={ !biodata ? "font-loius relative h-screen w-full overflow-hidden bg-[#141313] p-12": "hidden"}>
        <Image src={logo} alt="logo" className="w-[10vh]" />
        <h1 className="py-12 font-literata text-xl text-[#F4B829]">
          Isi data diri anda
        </h1>
        <form className="flex flex-col gap-y-2 pb-2">
          <h1
            className={value == null ? "hidden" : "font-louis text-[#635E5E]"}
          >
            Nama Depan
          </h1>
          <input
            type="email"
            {...register("email")}
            className={
              "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
            }
            placeholder="Nama Depan"
          />
          <h1
            className={value == null ? "hidden" : "font-louis text-[#635E5E]"}
          >
            Nama Belakang
          </h1>
          <input
            type="email"
            {...register("password")}
            className={
              "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
            }
            placeholder="Nama Belakang"
          />
          <h1
            className={value == null ? "hidden" : "font-louis text-[#635E5E]"}
          >
            Kata Sandi
          </h1>
          <div className="flex flex-row items-center justify-center gap-x-6">
            <select
              id="myDropdown"
              name="myDropdown"
              className="w-[8vh] bg-[#141313] p-2 text-sm text-white"
            >
              <option value="option1">+62</option>
              <option value="option2">+1</option>
              <option value="option3">+45</option>
            </select>
            <input
              type="email"
              {...register("password")}
              className={
                "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
              }
              placeholder="Nomor telepon"
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-x-6 border-b-2">
            <input
              type="email"
              {...register("password")}
              className={
                "h-[6vh] w-full bg-[#141313] text-white focus:outline-none"
              }
              placeholder="Alamat"
            />
            <i className="fas fa-location-dot text-white" />
          </div>
          <div className="flex flex-row gap-x-2 py-4">
            <input type="checkbox" value="Paneer" className="text-white" />
            <span className="font-louis text-[10px] text-white">
              Gunakan lokasi anda sekarang
            </span>
          </div>
          <div className="flex flex-row gap-x-2 pb-4">
            <input type="checkbox" value="Paneer" className="text-white" />
            <span className="font-louis text-[10px] text-white">
              Setuju dengan <span className="text-[#F4B829]">Terms</span> dan{" "}
              <span className="text-[#F4B829]">Provacy Policy</span> kami.
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            
              <h1 className="font-louis text-[#F4B829]" onClick={toggleBiodata}>Kembali</h1>

            <button
              type="submit"
              className="h-[6vh] w-1/2 rounded-md bg-[#F4B829] font-louis"
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
      {biodata ? <SignUp /> : null}
    </>
  );
};

export default Biodata;
