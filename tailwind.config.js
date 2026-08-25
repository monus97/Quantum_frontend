/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          300: '#f6e05e',
          400: '#ecc94b',
          500: '#d4af37',
          600: '#b7941f',
          700: '#97750c',
        },
        sacred: {
          dark: '#03191e',
          card: '#0a252c',
          border: '#153b44',
          accent: '#d4af37'
        }
      }
    },
  },
  plugins: [],
}
