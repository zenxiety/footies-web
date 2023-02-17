/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { hashPassword } from "../../utils/auth";

type FormValues = {
  name: string;
  email: string;
  password: string;
  telepon: string;
  apiError?: string;
};

const SignUp: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();
  const signUp = api.auth.signUp.useMutation();

  const signUpHandler = (data: FormValues) => {
    signUp
      .mutateAsync({
        name: data.name,
        email: data.email,
        password: hashPassword(data.password),
        telepon: data.telepon,
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
        <input type="text" {...register("name")} />
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <input type="tel" {...register("telepon")} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignUp;
