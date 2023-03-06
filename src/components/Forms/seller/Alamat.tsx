import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFormData } from "../../../context/FormContext";
import { type SellerFormValues } from "../../../pages/auth/signup/seller";
import Map from "../../Map";
import Nav from "./Nav";

export default function Alamat({
  prevFormStep,
  formStep,
  nextFormStep,
}: {
  prevFormStep: () => void;
  formStep: number;
  nextFormStep: () => void;
}) {
  const { setFormValues } = useFormData();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SellerFormValues>();

  const onSubmit = (values: SellerFormValues) => {
    // console.log(values);
    setFormValues(values);
    nextFormStep();
  };

  const [lng, setLng] = useState(110);
  const [lat, setLat] = useState(-7);
  const [location, setLocation] = useState("");

  {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative h-screen pt-20"
      >
        <div className="z-10 mx-auto w-screen px-8 xs:max-w-[500px]">
          <p>Alamat toko</p>
          <div className="mt-5 h-full w-full">
            <div className="relative h-[60vh] w-full border-4 border-primary-300">
              <Map
                lat={lat}
                lng={lng}
                location={location}
                setLat={setLat}
                setLng={setLng}
                setLocation={setLocation}
                initialOptions={{}}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg
                  width={31}
                  height={39}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.667 19.333c1.008 0 1.871-.359 2.59-1.078.719-.718 1.078-1.581 1.076-2.588 0-1.009-.359-1.872-1.078-2.59-.718-.72-1.581-1.078-2.588-1.077-1.009 0-1.872.36-2.59 1.078-.72.719-1.078 1.582-1.077 2.589 0 1.008.36 1.871 1.078 2.59.719.719 1.582 1.078 2.589 1.076zm0 18.334c-4.92-4.186-8.594-8.074-11.022-11.664C2.216 22.413 1 19.09 1 16.033 1 11.45 2.475 7.8 5.424 5.08 8.374 2.36 11.787 1 15.667 1s7.295 1.36 10.244 4.08c2.95 2.719 4.424 6.37 4.422 10.953 0 3.056-1.215 6.38-3.644 9.97-2.43 3.59-6.104 7.479-11.022 11.664z"
                    fill="#F6C73B"
                    stroke="#000"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-6 mb-1 mr-auto text-start text-sm text-secondary-100">
              Alamat Toko <span className="text-failed">*</span>
            </p>
            <input
              {...register("alamat", {
                required: "Alamat Toko tidak boleh kosong",
              })}
              value={location}
              autoComplete={"off"}
              type="text"
              className={`w-full text-ellipsis border-b bg-transparent py-1 font-louis text-[18px] font-light text-primary-300 duration-500 focus:border-b focus:border-others-white focus:outline-none ${
                errors.alamat ? "border-failed" : "border-secondary-100"
              }`}
            />
            {errors.alamat && (
              <span className="mt-[1em] block text-start font-louis text-[12px] text-failed">
                Alamat toko tidak boleh kosong
              </span>
            )}
          </div>
        </div>
        <Nav prevFormStep={prevFormStep} />
      </form>
    );
  }
}
