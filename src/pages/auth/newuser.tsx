/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import logo from "../../../public/icon-512x512.png";
import Image from "next/image";
import { getSession } from "next-auth/react";
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

const NewUser: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();
  const signUp = api.auth.googleVerification.useMutation();
  const signUpHandler = (data: FormValues) => {
    signUp
      .mutateAsync({
        telepon: data.telepon,
        alamat: data.alamat,
      })
      .then(async () => {
        await getSession();
        return await router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#141313] p-12">
      <Image src={logo} alt="logo" className="w-[10vh]" />
      <h1 className="py-12 font-literata text-xl text-[#F4B829]">
        Lengkapi data diri anda
      </h1>
      <form
        onSubmit={handleSubmit(signUpHandler)}
        className="flex flex-col gap-y-2 pb-2"
      >
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
            type="tel"
            {...register("telepon")}
            className={
              "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
            }
            placeholder="Nomor telepon"
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-x-6 border-b-2">
          <input
            type="text"
            {...register("alamat")}
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
          <button
            type="submit"
            className="ml-auto h-[6vh] rounded-md bg-[#F4B829] px-3 font-louis"
          >
            Lengkapi
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
