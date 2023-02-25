/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { hashPassword } from "../../utils/auth";

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
  const signUp = api.auth.signUp.useMutation();

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
    <div>
      <form onSubmit={handleSubmit(signUpHandler)}>
        <input type="text" {...register("firstName")} />
        <input type="text" {...register("lastName")} />
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <input type="tel" {...register("telepon")} />
        <input type="text" {...register("alamat")} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignUp;
