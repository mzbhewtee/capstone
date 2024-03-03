/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#9D1B1D",
        "secondary": "#000000",
        "accent": "#FFFFFF",
      },
      height: {
        "gee": "28rem",
      },
      textSizes: {
        "xxs": "4.5rem",
      },
      backgroundImage: theme => ({
        'features': "url('../src/assets/images/key-features.png')",
        'features2': "url('../src/assets/images/key-featurs-small.png')",
      }),
    },
  },
  plugins: [],
});