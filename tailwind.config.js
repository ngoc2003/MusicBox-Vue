/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    screens: {
      xs: '375px',
      sm: '414px',
      md: '768px',
      lg: '976px',
      xl: '1150px',
      xxl: '1260px',
      xxxl: '1440px'
    },
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
