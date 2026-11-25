/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lila: {
          50: "#f7f4ff",
          100: "#efe9ff",
          200: "#e0d4ff",
          300: "#c9b6fb",
          400: "#ab8ef5",
          500: "#8b66ea",
          600: "#7447d6",
          700: "#5f36b3",
          800: "#4c2d8f",
          900: "#3a2370",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};