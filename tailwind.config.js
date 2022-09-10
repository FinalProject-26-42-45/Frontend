const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'sm': '320px',
      'md': '768px',
      'lg': '1024px'
    },
    extend: {
      colors: {
        yellow: '#FFB911',
        yellow1: '#FFD87A',
        coral1: '#F95335',
        coral2: '#FD756D',
        gray1: '#F3F4F5',
        nood: '#E8DFDE',
        oldrose: '#F8DAD4',
        green: '#36E07A'
      },
    },
  },
  
  plugins: [],
}
