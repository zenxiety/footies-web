import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { FieldValues, useForm, UseFormSetValue } from "react-hook-form";
import { useFormData } from "../../../context/FormContext";
import { type SellerFormValues } from "../../../pages/auth/signup/seller";
import MapboxMap from "../../Map";
import Nav from "../Nav";

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
    setValue,
    getValues,
  } = useForm<SellerFormValues>();

  const onSubmit = (values: SellerFormValues) => {
    values.alamat = coord;
    console.log(coord);
    console.log(values);
    setFormValues(values);
    nextFormStep();
  };

  // -7.770797393657097, 110.37767682106005;
  const [lat, setLat] = useState(-7.770797393657097);
  const [lng, setLng] = useState(110.37767682106005);
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState("");

  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col items-center justify-between pt-20"
      >
        <div className="z-10 mx-auto w-screen px-8 xs:max-w-[500px]">
          <p>Alamat toko</p>
          <div className="mt-5 h-full w-full">
            <div className="relative h-[60vh] w-full border-4 border-primary-300">
              <MapboxMap
                lat={lat}
                lng={lng}
                coord={coord}
                location={location}
                setLat={setLat}
                setLng={setLng}
                setLocation={setLocation}
                setCoord={setCoord}
                checked={checked}
                initialOptions={{}}
                setValue={setValue as unknown as UseFormSetValue<FieldValues>}
              />
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
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
              {/* <label className="relative bg-red-300">
                <input
                  type="checkbox"
                  checked={checked}
                  // onChange={handleCheck}
                  className="before:content[''] group mt-4 h-5 w-5 appearance-none bg-white before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2"
                />
                <span className="absolute top-1/2 left-1/2 h-5 w-5 -translate-y-1/2 -translate-x-1/2 bg-primary-300 opacity-0 group-checked:opacity-100" />
              </label>
              <label
                className="relative flex cursor-pointer items-center justify-center rounded-full p-3"
                htmlFor="checkbox"
                data-ripple-dark="true"
              >
                <input
                  type="checkbox"
                  className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                  id="checkbox"
                  checked
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </label> */}
            </div>
            <p className="mt-6 mb-1 mr-auto text-start text-sm text-secondary-100">
              Alamat Toko <span className="text-failed">*</span>
            </p>
            <input
              {...register("alamat", {
                required: "Alamat Toko tidak boleh kosong",
              })}
              value={getValues("alamat")}
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
