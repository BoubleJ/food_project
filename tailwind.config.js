/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      customProperties: {
        // Define your custom properties here
        width: {
          150: "150px",
          500: "500px",
        },
      },
    },
  },
  plugins: [],
};
