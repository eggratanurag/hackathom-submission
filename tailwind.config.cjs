/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  
  theme: {
    extend: {
        colors: {
          oxfordGreen: "#003145",
          green: "#44924c"
        },
        fontFamily: {
          "poppins": ['Poppins']
         
        },
        boxShadow: {
          '3xl': "0px 3px 24px rgba(132, 132, 132, 0.16), inset 0px -3px 6px rgba(0, 0, 0, 0.06);"
        },
       
        
        
    },
  },
  plugins: [],
}
