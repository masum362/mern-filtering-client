/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      colors:{
        themePrimary:"#3795BD"
      }
    },
  },
  plugins: [require('daisyui'),],
}

