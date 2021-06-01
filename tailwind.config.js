module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
