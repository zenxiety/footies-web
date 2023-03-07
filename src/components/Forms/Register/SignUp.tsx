import { useForm } from "react-hook-form";
import { useState } from "react";
import { useFormData } from "../../../context/FormContext";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.css";
import { type SignUpFormValues } from "../../../pages/auth/signup";

export default function SignUpComponent({
  formStep,
  nextFormStep,
}: {
  formStep: number;
  nextFormStep: () => void;
}) {
  const { setFormValues } = useFormData<SignUpFormValues>();

  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm<SignUpFormValues>();

  const onSubmit = (values: SignUpFormValues) => {
    setFormValues(values);
    nextFormStep();
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} hidden={formStep != 0}>
      <div className="relative z-0 mb-2 font-louis">
        <input
          {...register("email", {
            required: true,
            pattern: new RegExp(
              "[a-z,0-9,A-Z]+[@,.]+[a-z,0-9,A-Z]+[.]+[a-z,0-9,A-Z]"
            ),
          })}
          type="email"
          className={`peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:outline-none focus:ring-0 ${
            errors.email ? "focus:border-red-500" : "focus:border-primary-300"
          }`}
          placeholder=" "
        />
        <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
          Email
        </label>
        {errors?.email?.type === "required" && (
          <span className="text-[12px] text-[#F51C2F]">This is required</span>
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
            pattern: new RegExp(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            ),
            minLength: 8,
          })}
          className={`peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:outline-none focus:ring-0 ${
            errors.password
              ? "focus:border-red-500"
              : "focus:border-primary-300"
          }`}
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
            required: true,
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Password anda tidak sesuai";
              }
            },
          })}
          className={`peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:outline-none focus:ring-0 ${
            errors.confirmPassword
              ? "focus:border-red-500"
              : "focus:border-primary-300"
          }`}
          placeholder=" "
        />
        <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
          Konfirmasi Kata Sandi
        </label>
        {errors.confirmPassword &&
          errors.confirmPassword.type === "required" && (
            <span className="text-[12px] text-[#F51C2F]" role="alert">
              This is required
            </span>
          )}

        {errors.confirmPassword && (
          <span className="text-[12px] text-[#F51C2F]" role="alert">
            {errors.confirmPassword.message}
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
          <h1 className="font-louis text-white">Perlihatkan kata sandi</h1>
        </div>
      </div>
      <div className="my-4 flex flex-row items-center justify-between">
        <Link href="/auth/signin">
          <h1 className="font-louis text-[#F4B829]">Masuk</h1>
        </Link>

        <button
          type="submit"
          className="h-[6vh] cursor-pointer rounded-md bg-[#F4B829] px-3 font-louis"
        >
          Selanjutnya
        </button>
      </div>
      <div className="my-4 flex flex-row items-center justify-center">
        <div className="border-t-2 text-white" />
        <h1 className="font-louis text-[12px] text-white">atau masuk dengan</h1>
        <div className="border-t-2 text-white" />
      </div>
    </form>
  );
}
