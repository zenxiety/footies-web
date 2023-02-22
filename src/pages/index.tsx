import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  // setTimeout(() => {
  //   if (count === 0) {
  //     window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
  //   }
  // }, 1000);

  return (
    <>
      <Head>
        <title>Footies</title>
      </Head>
      <section className="grid h-screen w-screen place-content-center gap-y-8 bg-others-black text-center text-primary-300">
        <h1 className="font-literata text-9xl">Your feet are cute :)</h1>
        <h2 className="text-xl">OUR WEBSITE WILL BE RELEASED IN {count}</h2>
      </section>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
