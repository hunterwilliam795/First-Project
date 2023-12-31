/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    "./*.{html,js}",
    "./pageOne/**/*.{html,js}",
    "node_modules/flowbite-react/lib/esm/**/*.js"],

  plugins: [require('flowbite/plugin')],

    theme: {},
  extend: {},
}

// Initialization for ES Users
import {
  Carousel,
  initTE,
} from "tw-elements";

initTE({ Carousel });
