/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          200: "#d9ddee",
          600: "#7164c0",
          500: "#9492db"
        },
        gray: {
          50:"rgba(255,255,255,0.5)",
          100: "#eeeeef",
          200: "#e6e9ed",
          600: "#95989c"
        }
      }
    },
  },
  plugins: [],
}

