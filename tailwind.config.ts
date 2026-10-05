import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#18181b",
          light: "#27272a",
          dark: "#09090b",
        },
        accent: {
          DEFAULT: "#16a34a",
          hover: "#15803d",
          light: "#dcfce7",
          text: "#14532d",
        },
      },
    },
  },
  plugins: [],
};

export default config;
