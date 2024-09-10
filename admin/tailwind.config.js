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
      gridTemplateColumns: {
        'custom': '0.5fr 2fr 1fr 1fr 0.5fr',
        'custom1': '1fr 3fr 1fr',
        'custom2': '0.5fr 2fr 1fr 1fr 1fr',
        'custom3': '0.5fr 2fr 1fr'
      },
    },
  },
  plugins: [],
}