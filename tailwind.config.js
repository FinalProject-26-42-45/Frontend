const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#FFB911',
        coral1: '#F95335',
        coral2: '#FD756D',
        gray1: '#F3F4F5'
      },
    },
  },
  
  plugins: [],
}
