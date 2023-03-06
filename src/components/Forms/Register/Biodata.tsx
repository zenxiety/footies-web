import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "../../../utils/api";
import { useFormData } from "../../../context/FormContext";
import "@fortawesome/fontawesome-free/css/all.css";
import type { SignUpFormValues } from "../../../pages/auth/signup";

export default function Biodata({
  prevFormStep,
  formStep,
}: {
  prevFormStep: () => void;
  formStep: number;
}) {
  const { data, setFormValues } = useFormData<SignUpFormValues>();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignUpFormValues>();
  const router = useRouter();
  const signUp = api.auth.signUp.useMutation();
  const signUpHandler = (values: SignUpFormValues) => {
    signUp
      .mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        email: data.email,
        password: data.password,
        telepon: values.telepon,
        alamat: values.alamat,
      })
      .then(async () => {
        setFormValues({});
        return await router.push("/auth/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  {
    return (
      <form onSubmit={handleSubmit(signUpHandler)} hidden={formStep != 1}>
        <div className="relative z-0 mb-2 font-louis">
          <input
            {...register("firstName", { required: true })}
            type="text"
            className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
            Nama Depan
          </label>
          {errors?.firstName?.type === "required" && (
            <span className="text-[12px] text-[#F51C2F]" role="alert">
              This is required
            </span>
          )}
        </div>
        <div className="relative z-0 mb-2 font-louis">
          <input
            {...register("lastName", { required: true })}
            type="text"
            className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
            Nama Belakang
          </label>
          {errors.lastName && errors.lastName.type === "required" && (
            <span className="text-[12px] text-[#F51C2F]" role="alert">
              This is required
            </span>
          )}
        </div>
        <div className="flex flex-row items-center justify-between gap-x-6">
          <select
            id="myDropdown"
            name="myDropdown"
            className="w-[8vh] bg-transparent p-2 text-sm text-others-white"
          >
            <option value="option1">+62</option>
            <option value="option2">+1</option>
            <option value="option3">+45</option>
          </select>
          <div className="relative z-0 flex-grow font-louis">
            <input
              {...register("telepon", { required: true, maxLength: 30 })}
              type="number"
              className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
              No Telepon
            </label>
            {errors.telepon && errors.telepon.type === "required" && (
              <span className="text-[12px] text-[#F51C2F]" role="alert">
                This is required
              </span>
            )}
          </div>
        </div>
        <div className="relative z-0 flex font-louis">
          <input
            {...register("alamat", { required: true, maxLength: 30 })}
            type="text"
            className="peer block w-full appearance-none border-0 border-b-2 border-secondary-200 bg-transparent py-2.5 px-0 pr-5 text-others-white focus:border-primary-300 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <i className="fas fa-location-dot absolute right-0 top-1/2 -translate-y-1/2 text-white" />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-secondary-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
            Alamat
          </label>
        </div>
        {errors.alamat && errors.alamat.type === "required" && (
          <span className="text-[12px] text-[#F51C2F]" role="alert">
            This is required
          </span>
        )}
        <div className="flex flex-row items-center gap-x-2 py-4">
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
          <span className="font-louis text-[10px] text-white">
            Gunakan lokasi anda sekarang
          </span>
        </div>
        <div className="flex flex-row items-center gap-x-2 pb-4">
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
          <span className="font-louis text-[10px] text-white">
            Setuju dengan{" "}
            <span className="font-italic text-[#F4B829] italic">Terms</span> dan{" "}
            <span className="font-italic text-[#F4B829] italic">Provacy Policy</span>{" "}
            kami.
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-louis text-[#F4B829]" onClick={prevFormStep}>
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
    );
  }
}
