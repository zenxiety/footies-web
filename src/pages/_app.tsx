import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbarbuyer";

import { api } from "../utils/api";

import "../styles/globals.css";

import { Literata } from "next/font/google";
import localFont from "next/font/local";

const literata = Literata({
  // weight: ["200", "300", "500", "700", "400", "600", "800", "900"],
  // weight: ["variable"],
  subsets: ["latin"],
  variable: "--font-literata",
});

const louis = localFont({
  variable: "--font-louis",
  src: [
    {
      path: "../../public/fonts/louis-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/louis-light-italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/louis-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/louis-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/louis-bold.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/louis-bold-italic.ttf",
      weight: "500",
      style: "italic",
    },
  ],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <div className={`${literata.variable} bg-secondary-500 font-serif`}>
        <div
          className={`${louis.variable} relative mx-auto font-sans shadow-xl xs:max-w-[500px]`}
        >
          {/* <Navbar /> */}
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </div>
      </div>
    </>
  );
};

export default api.withTRPC(MyApp);
