/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#3e3636",
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
}