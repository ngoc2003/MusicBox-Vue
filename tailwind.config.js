/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    colors: {
      primary: '#ef323f',
      dark: { main: '#0d0d0d', light: '#161616' },
      white: '#fff',
      black: '#000',
      grey: '#747474',
      transparent: 'transparent',
      current: 'current'
    },
    extend: {}
  },
  plugins: []
}
