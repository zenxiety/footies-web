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
  const [depan, setDepan] = useState(false);
  const [belakang, setBelakang] = useState(false);
  const [telepon, setTelepon] = useState(false);
  const [alamat, setAlamat] = useState(false);
  const [biodata, setBiodata] = useState(false);
  const [biodata1, setBiodata1] = useState(false);
  const [focus, setFocus] = useState(false);
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleDepan = () => {
    setDepan((prev) => !prev);
  };
  const toggleBelakang = () => {
    setBelakang((prev) => !prev);
  };
  const toggleTelepon = () => {
    setTelepon((prev) => !prev);
  };
  const toggleAlamat = () => {
    setAlamat((prev) => !prev);
  };
  const toggleBiodata1 = () => {
    setBiodata((prev) => !prev);
  };
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
  const handleCheckboxChange1 = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsChecked1(event.target.checked);
  };
  const handleCheckboxChange2 = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsChecked2(event.target.checked);
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
        <h1 className="py-12 font-literata text-[23.7px] text-[#F4B829]">
          Buat akun Footies anda
        </h1>
        <form
          onSubmit={handleSubmit(signUpHandler)}
          className="flex flex-col gap-y-2 pb-2"
        >
          <h1
            className={
              !focus
                ? "absolute top-[222px] z-50 translate-y-12 text-[16px] text-[#635E5E] duration-500 font-louis"
                : "absolute top-[255px] z-50 font-louis text-[10px] text-[#635E5E] duration-500 "
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
                ? "absolute top-[278px] z-50 translate-y-12 text-[16px] text-[#635E5E] duration-500 font-louis"
                : "absolute top-[316px] z-50 font-louis text-[10px] text-[#635E5E] duration-500 "
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
                ? "absolute top-[335px] z-50 translate-y-12 text-[16px] text-[#635E5E] duration-500 font-louis"
                : "absolute top-[373px] z-50 font-louis text-[10px] text-[#635E5E] duration-500 "
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
                      ? "flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-[#F4B829] pt-0 outline-[#F4B829] outline-double"
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
      <div
        className={
          !biodata1
            ? "font-loius relative h-screen w-full overflow-hidden bg-[#141313] p-12"
            : "hidden"
        }
      >
        <Image src={logo} alt="logo" className="w-[10vh]" />
        <h1 className="py-12 font-literata text-[23.7px] text-[#F4B829]">
          Isi data diri anda
        </h1>
        <form className="flex flex-col gap-y-2 pb-2">
          <h1
            className={
              !depan
                ? "absolute top-[223px] z-50 translate-y-12 text-[16px] text-secondary-100 duration-500 font-louis"
                : "absolute top-[253px] z-50 font-louis text-[10px] text-secondary-100 duration-500 "
            }
          >
            Nama Depan
          </h1>
          <input
            type="text"
            {...register("firstName")}
            className={
              "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
            }
            onClick={toggleDepan}
          />
          <h1
            className={
              !belakang
                ? "absolute top-[278px] z-50 translate-y-12 text-[16px] text-secondary-100 duration-500 font-louis"
                : "absolute top-[312px] z-50 font-louis text-[10px] text-secondary-100 duration-500 "
            }
          >
            Nama Belakang
          </h1>
          <input
            type="text"
            {...register("lastName")}
            className={
              "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
            }
            onClick={toggleBelakang}
          />
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
            <h1
              className={
                !telepon
                  ? "absolute top-[333px] left-[133px] z-50 translate-y-12 text-[16px] text-secondary-100 duration-500 font-louis"
                  : "absolute top-[368px] left-[133px] z-50 font-louis text-[10px] text-secondary-100 duration-500 "
              }
            >
              Nomor telepon
            </h1>
            <input
              type="number"
              {...register("telepon")}
              className={
                "h-[6vh] w-full border-b-2 border-[#d9d9d9] bg-[#141313] text-white focus:border-[#F4B829] focus:outline-none"
              }
              onClick={toggleTelepon}
            />
          </div>
          <h1
            className={
              !alamat
                ? "absolute top-[393px] z-50 translate-y-12 text-[16px] text-secondary-100 duration-500"
                : "absolute top-[425px] z-50 font-louis text-[10px] text-secondary-100 duration-500 "
            }
          >
            Alamat
          </h1>
          <div className="flex flex-row items-center justify-between gap-x-6 border-b-2">
            <input
              type="text"
              {...register("alamat")}
              className={
                "h-[6vh] w-full bg-[#141313] text-white focus:outline-none"
              }
              onClick={toggleAlamat}
            />
            <i className="fas fa-location-dot text-white" />
          </div>
          <div className="flex flex-row gap-x-2 py-4 items-center">
            <label>
              <input
                type="checkbox"
                checked={isChecked1}
                onChange={handleCheckboxChange1}
                style={{ display: "none" }} // hide default checkbox
              />
              <span // custom checkbox style
                className={
                  isChecked1
                    ? "flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-[#F4B829] pt-0 outline-[#F4B829] outline-double"
                    : "flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-white"
                }
              />
            </label>
            <span className="font-louis text-[10px] text-white">
              Gunakan lokasi anda sekarang
            </span>
          </div>
          <div className="flex flex-row gap-x-2 pb-4 items-center">
            <label>
              <input
                type="checkbox"
                checked={isChecked2}
                onChange={handleCheckboxChange2}
                style={{ display: "none" }} // hide default checkbox
              />
              <span // custom checkbox style
                className={
                  isChecked2
                    ? "flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-[#F4B829] pt-0 outline-[#F4B829] outline-double"
                    : "flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-white"
                }
              />
            </label>
            <span className="font-louis text-[10px] text-white">
              Setuju dengan <span className="text-[#F4B829]">Terms</span> dan{" "}
              <span className="text-[#F4B829]">Provacy Policy</span> kami.
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
        </form>
      </div>
    </>
  );
};

export default SignUp;
