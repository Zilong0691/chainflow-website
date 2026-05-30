import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171b17",
        graphite: "#080b09",
        paper: "#f5f1e9",
        rice: "#fffaf0",
        gold: "#d7b15d",
        ember: "#f2c76a",
        jade: "#1f8f84",
        moss: "#637464",
        clay: "#b77852",
        line: "#d9cfbd"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(23, 27, 23, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
