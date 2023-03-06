import Image from "next/image";
import Efisiensi from "../../../public/assets/Efisiensi.png";
import {useForm } from "react-hook-form";
import Link from "next/link";
import {useFormData } from "../../context/FormContext";
import Nav from "./Nav";

export default function Second({
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
  } = useForm({ mode: "all" });
  return (
    <>
      <div className="z-50 mx-auto px-8 pt-0 relative">
        <div className=" items-start flex w-full justify-center">
          <Image src={Efisiensi} alt="" width={300} className="relative z-50"/>
        </div>
        <p className="mt-6 mr-auto text-start font-literata text-4xl uppercase text-neutral-300">
          penggunaan yang beragam
        </p>
        <p className="mt-6 mr-auto text-start text-sm text-neutral-100 font-louis">
          Fleksibilitas untuk dapat mendaftar sebagai pembeli, penjual, dan
          pengemudi melalui satu akun saja.
        </p>
        <p className="mt-6 mr-auto text-start text-sm text-neutral-100 font-louis">
          Bergabunglah dengan kami dan rasakan kemudahannya{" "}
        </p>
        <Link href="/auth/signin">
          <p className="font-louis text-primary-300 text-left pt-6 text-lg ">Masuk</p>
        </Link>
      </div>
      <Nav prevFormStep={prevFormStep} />
      </>
  );
}
