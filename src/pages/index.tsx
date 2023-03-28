import { type NextPage } from "next";
import React from "react";
import Head from "next/head";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import Welcome from "./Welcome";

import { api } from "../utils/api";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Footies</title>
      </Head>
      {/* <Layout> */}
      <Welcome data={null} />
      {/* <main className="flex h-screen flex-col justify-between gap-y-8 bg-secondary-500 text-center">
        
        <h1 className="font-literata text-5xl text-primary-300">
          Your feet are cute :)
        </h1>
        <div className="text- text-secondary-100">
          <h1 className="font-louis">
            Are mine too? a quick brown fox jumps over the lazy dog
          </h1>
          <h1 className="font-louis italic">
            Are mine too? a quick brown fox jumps over the lazy dog
          </h1>
          <h1 className="font-louis font-light">
            Are mine too? a quick brown fox jumps over the lazy dog
          </h1>
          <h1 className="font-louis font-light italic">
            Are mine too? a quick brown fox jumps over the lazy dog
          </h1>
          <h1 className="font-louis font-bold">
            Are mine too? a quick brown fox jumps over the lazy dog
          </h1>
          <h1 className="font-louis font-bold italic">
            Are mine too? a quick brown fox jumps over the lazy dog
          </h1>
        </div>
      </main>
      {/* </Layout> */}
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div> */}
//   );
// };
