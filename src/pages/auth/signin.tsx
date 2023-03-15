import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import logo from "../../../public/assets/logo-orange.png";
import Image from "next/image";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState } from "react";
type FormValues = {
  email: string;
  password: string;
  remember?: boolean;
  apiError?: string;
};
const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });
  const [error, setError] = useState("");
  const passDigital = new RegExp(
    "[a-z,0-9,A-Z]+[@,.]+[a-z,0-9,A-Z]+[.]+[a-z,0-9,A-Z]"
  );
  const onSubmit = (data: any) => console.log(data);
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const signinHandler = async (data: FormValues) => {
    const res = await signIn("credentials", {
      ...data,
      callbackUrl: "/",
      redirect: false,
    });

    if (res && !res?.error) return await router.push("/");
    setError(res?.error as string);
    return setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      <div className="relative flex h-screen w-full flex-col justify-between bg-[#141313] p-12">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-x-4">
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
            <div className="relative z-0 mb-2 font-louis">
              <input
                {...register("email", {
                  required: true,
                  maxLength: 30,
                  pattern: passDigital,
                })}
                type="text"
                className={`peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:outline-none focus:ring-0 ${
                  errors.email
                    ? "focus:border-red-500"
                    : "focus:border-primary-300"
                }`}
                placeholder=" "
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
                Email
              </label>

              {errors?.email?.type === "required" && (
                <span className="text-[12px] text-[#F51C2F]">Wajib diisi</span>
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
                {...register("password", { required: true })}
                className={`peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:outline-none focus:ring-0 ${
                  errors.password
                    ? "focus:border-red-500"
                    : "focus:border-primary-300"
                }`}
                placeholder=" "
              />
              <i
                className={
                  passwordVisible
                    ? "fas fa-eye absolute right-0 top-1/2 -translate-y-1/2 text-white"
                    : "fas fa-eye-slash absolute right-0 top-1/2 -translate-y-1/2 text-white"
                }
                onClick={togglePasswordVisibility}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
                Kata Sandi
              </label>
              {errors?.password?.type === "required" && (
                <span className="text-[12px] text-[#F51C2F]">Wajib diisi</span>
              )}
            </div>

            <div className="flex flex-row justify-between py-4">
              <div className="flex flex-row items-center justify-center gap-x-2">
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
                <h1 className="font-louis text-white">Ingat saya</h1>
              </div>
              <p className="pt-1 font-louis text-[12px] text-[#F4B829]">
                Lupa kata sandi?
              </p>
            </div>
            {error && (
              <span className="mx-auto text-[12px] text-[#F51C2F]">
                Pengguna tidak ditemukan
              </span>
            )}
            <button
              type="submit"
              className="mt-4 h-[6vh] w-full rounded-md bg-[#F4B829] font-louis"
            >
              Masuk
            </button>
            <div className="mx-auto mb-2 block">
              <Link href="/auth/signup">
                <h1 className="mx-auto block font-louis text-[12px] text-[#999999]">
                  Belum punya akun?{" "}
                  <span className="font-louis text-white">
                    Daftar sekarang!
                  </span>
                </h1>
              </Link>
            </div>

            <div className="mt-2 flex flex-row items-center justify-center">
              <div className="absolute border-t-2 border-white" />
              <h1 className="font-louis text-[16px] text-white">
                atau daftar dengan
              </h1>
              <div className="border-t-2 border-white" />
            </div>
          </form>
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
        </div>
      </div>
    </>
  );
};

export default SignIn;
