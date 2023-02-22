const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#F7C85A",
        "primary-200": "#F5B829",
        "primary-300": "#E1A10B",
        "primary-400": "#AF7D09",
        "primary-500": "#7E5A06",
        "secondary-100": "#7E7777",
        "secondary-200": "#635E5E",
        "secondary-300": "#494646",
        "secondary-400": "#2F2D2D",
        "secondary-500": "#141313",
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
    },
  },
  plugins: [],
};
