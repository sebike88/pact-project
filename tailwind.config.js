const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      sans: ['Overpass', ...defaultTheme.fontFamily.sans]
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
