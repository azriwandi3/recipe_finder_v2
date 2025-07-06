/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        akronim:["Akronim", "serif"],
        comfortaa:["Comfortaa", 'serif'],
        roboto:["Roboto", 'serif'],
      }
    },
  },
  plugins: [],
}

