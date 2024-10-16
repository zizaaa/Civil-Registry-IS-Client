const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        "darkCyan":"#0E7490",
        "darkBlueTeel":"#145C7F",
        "lightCyan":"#145b7f22",
        "green":"#008000"
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

