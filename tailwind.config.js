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
        600: "#80696F",
        700: "#403438",
      },

      secondary: {
        light: "#907b81",
        normal: "#73696c",
        dark: "#6e686c",
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
