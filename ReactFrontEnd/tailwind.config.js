/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      nps: {
        green: {
          "100": "#C3CEAF",
          "200": "#B6C49F",
          "300": "#AABA90",
          "400": "#9EB081",
          "500": "#92A572",
          "600": "#869A63",
          "700": "#788A5A",
          "800": "#6B7A50",
          "900": "#5D6B46",
          "999": "#505B3D",
        },

        }
      }
    },
  
  plugins: [require('flowbite/plugin')],
}