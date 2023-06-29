/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      red: "#B11030",
      primary: {
        100: "#f9e5e7",
        200: "#efd4d9",
        300: "#d2acb7",
        400: "#E6BCC9",
        500: "#BF9DA7",
        600: "#a8808b",
        700: "#7e5f67",
        800: "#555555",
      },
      secondary: {
        100: "#3D2F5B",
      },
    },
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
