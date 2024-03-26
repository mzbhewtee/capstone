/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // Set darkMode to "media"
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "secondary": "#000000",
        "accent": "#FFFFFF",
      },
      height: {
        "gee": "28rem",
        "100vh": "80vh",
      },
      width: {
        "norm": "19rem",
      },
      fontSize: {
        "xxs": "4.5rem",
      },
      backgroundImage: theme => ({
        'features': "url('../src/assets/images/key-features.png')",
        'features2': "url('../src/assets/images/key-featurs-small.png')",
      }),
      fontFamily: {
        "font-link": ["IBM Plex Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
});
