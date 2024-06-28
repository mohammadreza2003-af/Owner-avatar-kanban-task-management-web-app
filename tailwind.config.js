/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorLightGrey: "rgb(244, 247, 253)",
        colorLightWhite: "rgb(255, 255, 255)",
        colorMediumGrey: "rgb(43  , 44, 55)",
        colorHighGrey: "rgb(32  , 33, 44)",
        colorMainPurple: "rgb(100, 96, 199)",
        colorLinesLight: "rgb(228, 235, 250)",
        colorRed: "rgb(234, 85, 85)",
      },
    },
  },
  plugins: [],
};

