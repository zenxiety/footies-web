import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import EditForm from "../../../components/seller/EditForm";
import { api } from "../../../utils/api";
import { uploadImage } from "../../../utils/cloudinary";
import { DriverFormValues } from "../../auth/signup/driver";

export type AddItemValues = {
  foto: string;
  nama: string;
  hargaAwal: number;
  deskripsi: string;
  diskon: number;
  hargaAkhir: number;
};

export default function Add() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    register,
  } = useForm<AddItemValues>({ mode: "all" });
  const merchant = api.merchant.listProduct.useMutation();
  const router = useRouter();

  const onSubmit = (values: AddItemValues) => {
    // console.log("Foto menu:", values.foto);
    // console.log("Nama menu:", values.nama);
    // console.log("Harga awal menu sebelum diskon:", values.hargaAwal);
    // console.log("Deskripsi menu:", values.deskripsi);
    // console.log("Diskon:", values.diskon);
    // console.log("Harga akhir menu setelah diskon:", values.hargaAkhir);

    merchant
      .mutateAsync({
        picture: values.foto,
        productName: name,
        price: price,
        description: desc,
        promo: discValue.toString(),
      })
      .then(async (res) => {
        await router.push("/seller/my-items");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { getRootProps, getInputProps, isDragActive, open, fileRejections } =
    useDropzone({
      noClick: true,
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
      },
      onDrop: useCallback(
        (acceptedFiles: File[]) => {
          uploadImage(acceptedFiles[0] as File)
            .then((url) => {
              setValue("foto", url as string, { shouldValidate: true });
            })
            .catch((e) => console.log(e));
        },
        [setValue]
      ),
      maxFiles: 1,
    });

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);

  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    let discounted = 0;
    setPrice(price);

    if (discType == "%") {
      if (String(discValue).length > 3) {
        String(discValue).slice(0, 2);
      }
      discounted = price - (price * Number(String(discValue))) / 100;
    } else {
      if (String(discValue).length > String(price).length) {
        String(discValue).slice(0, String(price).length - 1);
      }
      discounted = price - Number(String(discValue));
    }

    discounted < 0 ? setDiscounted(0) : setDiscounted(discounted);
    setValue("hargaAkhir", discounted);
  };

  const [descLength, setDescLength] = useState(0);

  const handleDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDescLength(val.length);
    setDesc(val);
  };

  const [discValue, setDiscValue] = useState(0);

  const maxDiscLength = (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const priceLen = String(price).length;

    if (discType == "%") {
      if (input.length > 3) e.currentTarget.value = input.slice(0, 3);
    } else {
      if (input.length > priceLen)
        e.currentTarget.value = input.slice(0, priceLen);
    }
  };

  const handleDiscValue = (e: ChangeEvent<HTMLInputElement>) => {
    const discAmount = e.target.value;
    setDiscValue(Number(discAmount));
    let discounted = 0;

    if (discType == "%") {
      if (discAmount.length > 3) {
        discAmount.slice(0, 2);
      }
      discounted = price - (price * Number(discAmount)) / 100;
    } else {
      if (discAmount.length > String(price).length) {
        discAmount.slice(0, String(price).length - 1);
      }
      discounted = price - Number(discAmount);
    }

    discounted < 0 ? setDiscounted(0) : setDiscounted(discounted);
    setValue("hargaAkhir", discounted);
  };

  const [discType, setDiscType] = useState("%");
  const [discounted, setDiscounted] = useState(0);

  return (
    <>
      <Head>
        <title>Add Item - Footies</title>
      </Head>
      <EditForm page="add" menu={undefined} />
    </>
  );
}
