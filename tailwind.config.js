/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6A4EE9",
      },
      backgroundColor: {
        primary: "#6A4EE9",
        primaryHover: "#5739dd",
      },
      backgroundImage: {
        login: "url('/bg-login.png')",
        register: "url('/bg-register.png')",
      },
    },
  },
  plugins: [],
};
