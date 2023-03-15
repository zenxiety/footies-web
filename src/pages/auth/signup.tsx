/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import logo from "../../../public/assets/logo-orange.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import "@fortawesome/fontawesome-free/css/all.css";
import Biodata from "../../components/Forms/Register/Biodata";
import FormProvider from "../../context/FormContext";
import SignUpComponent from "../../components/Forms/Register/SignUp";
import Head from "next/head";

export type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telepon: string;
  alamat: string;
  confirmPassword: string;
  checkbox?: boolean;
  remember?: boolean;
  apiError?: string;
};

function SignUp() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    // buat ngilangin hydration error things
    setDomLoaded(true);
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>({ mode: "onChange" });
  const [page, setPage] = useState(0);

  const nextFormStep = () => {
    setPage((page) => page + 1);
  };

  const prevFormStep = () => {
    setPage((page) => page - 1);
  };

  return (
    <>
      <Head>
        <title>Daftar - Footies</title>
      </Head>
      <div
        className={
          "relative min-h-screen w-full overflow-hidden bg-secondary-500 p-12"
        }
      >
        <Image src={logo} alt="logo" className="w-[10vh]" />
        <h1 className="py-12 font-literata text-[23.7px] text-primary-300">
          {page == 0 ? "Isi data diri anda" : "Buat akun Footies anda"}
        </h1>
        <div className="flex flex-col gap-y-2 pb-2">
          <FormProvider>
            <SignUpComponent formStep={page} nextFormStep={nextFormStep} />
            <Biodata formStep={page} prevFormStep={prevFormStep} />
          </FormProvider>
        </div>
        {page == 0 && (
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
}

export default SignUp;
