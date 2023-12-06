/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        landing_page_bg:
          "url('/public/assets/images/landing-page-background.jpg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
