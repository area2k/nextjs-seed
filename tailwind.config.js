// const { text, ...colors } = require('./theme/colors')
const { colors, textColors } = require('./theme/colorNames')

module.exports = {
  content: ['./src/**/*.{tsx,css}'],
  dark: 'class',
  theme: {
    colors: {
      current: 'currentColor',
      inherit: 'inherit',
      transparent: 'transparent',
      white: 'white',
      black: 'black',
      ...colors,
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    textColor: {
      current: 'currentColor',
      inherit: 'inherit',
      white: 'white',
      black: 'black',
      ...textColors,
    },
    screens: {
      phone: { max: '639px' },
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
      largeDesktop: '1536px',

      allowsMotion: { raw: '(prefers-reduced-motion: no-preference)' },
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
