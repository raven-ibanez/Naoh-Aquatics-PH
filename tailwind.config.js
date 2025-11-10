/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aquatic: {
          teal: '#00BCD4',
          'teal-dark': '#0097A7',
          'teal-light': '#4DD0E1',
          charcoal: '#2C2C2E',
          bubble: '#E1F5FE',
          ocean: '#006064'
        }
      }
    },
  },
  plugins: [],
};
