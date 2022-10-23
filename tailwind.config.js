const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'sm': '320px',
      'md': '768px',
      // 'lg': {'min': '1024px', 'max': '1400px'}
      'lg': '1400px'
    },
    extend: {
      colors: {
        yellow: '#FFB911',
        yellow1: '#FFD87A',
        yellow2: '#FFD952',
        yellow3: '#FFD643',
        yellow4: '#FFE68C',
        coral1: '#F95335',
        coral2: '#FD756D',
        gray1: '#F3F4F5',
        gray2: '#EAE8E8',
        nood: '#E8DFDE',
        oldrose: '#F8DAD4',
        green: '#36E07A',
        blue: '#0A2445',
        blue1: '#193D6D'
      },
      backgroundImage: {
        'randomImg': "url('./random.png')",
        'randomCutomImg': "url('./menu-custom.png')"
      }
    },
  },
  
  plugins: [],
}
