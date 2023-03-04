// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#FBE39D",
        "primary-200": "#F8D56D",
        "primary-300": "#F6C73B",
        "primary-400": "#F4B90B",
        "primary-500": "#C39409",
        "secondary-100": "#808080",
        "secondary-200": "#666666",
        "secondary-300": "#4D4D4D",
        "secondary-400": "#333333",
        "secondary-500": "#1A1A1A",
        "others-white": "#EFEFEF",
        "others-black": "#1D1D1D",
        "others-brown": "#A06235",
        success: "#00E09B",
        alert: "#F2A201",
        failed: "#F51C2F",
        info: "#4C6EF5",
      },
      fontFamily: {
        literata: ["var(--font-literata)", ...fontFamily.serif],
        louis: ["var(--font-louis)", ...fontFamily.sans],
      },
      animation: {
        "spin-fast": "spin .75s linear infinite reverse",
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [],
};
