/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      primary: {
        100: "#f9e5e7",
        200: "#efd4d9",
        300: "#d2acb7",
        400: "#E6BCC9",
        500: "#BF9DA7",
        600: "#a8808b",
        700: "#7e5f67",
        800: "#80696F",
        900: "#403438",
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
