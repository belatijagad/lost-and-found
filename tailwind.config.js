/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'nav': '#2c2c2c',
      'foot': '#f1f1f1',
    },
    extend: {
      fontFamily: {
        'qs': ['Quicksand'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}