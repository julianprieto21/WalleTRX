import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          100: "#f5f3f4",
          200: "#CCC5B9",
          250: "#403D39",
          300: "#2A2927",
          400: "#252422",
          500: "#ffd100",
        },
        income: colors.green[600],
        expense: colors.red[600],
        transfer: colors.violet[600],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "3xl": "1680px",
      },
    },
  },
  plugins: [],
};
export default config;
