/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#111015',
        'dark-text': '#ffffff',
      },
      fontFamily: {
        quiksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}