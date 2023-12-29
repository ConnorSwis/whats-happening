/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        secondary: colors.yellow,
        background: colors.neutral,
      },
    },
  },
  plugins: [],
};
