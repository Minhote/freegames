/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        "max-height": "max-height",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter", "luxury"],
  },
};
