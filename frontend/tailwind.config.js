/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'responsive': 'max(1.4vw, 16px)',
      },
      backgroundImage: {
        'header-bg': "url('/frontend/src/assets/header_img.png')",
      },
    },
  },
  plugins: [],
}