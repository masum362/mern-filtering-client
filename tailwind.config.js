/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        themePrimary:"#289DB9",
        themeSecondary:"#3F5965",
      }
    },
  },
  plugins: [require('daisyui'),],
}