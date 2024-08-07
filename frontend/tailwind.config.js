/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '750px',
      'md': '900px',
      'lg': '1050px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontSize: {
        'responsive': 'max(1.4vw, 16px)',
      },
      gridTemplateColumns: {
        'custom': '1fr 1.5fr 1fr 1fr 1fr 0.5fr',
      },
    },
  },
  plugins: [],
}