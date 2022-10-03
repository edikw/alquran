/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#cb70f4',
          light: '#f7fdfd',
          blue: '#4edadb'
        }
      },
    },
  },
  plugins: [],
}
