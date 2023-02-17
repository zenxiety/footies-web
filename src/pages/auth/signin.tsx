/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  apiError?: string;
};

const SignIn: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const signinHandler = async (data: FormValues) => {
    const res = await signIn("credentials", {
      ...data,
      callbackUrl: "/",
      redirect: false,
    });

    console.log(res);
    if (res && !res?.error) return await router.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(signinHandler)}>
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <button type="submit">Signin</button>
      </form>
      <button
        className="bg-red-500"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
            redirect: false,
          })
        }
      >
        Google Login
      </button>
    </div>
  );
};

export default SignIn;
