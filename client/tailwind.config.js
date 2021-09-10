module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        custom: {
          backgorund: '#E3E3EC',
          gray: {
            lightest: '#F3F5F9',
            light: '#E2E3E3',
            regular: '#B1B1B1',
            dark: '#8D8D8D'
          }
        }
      }
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"]
    },
  },
  variants: {
    extend: {
      margin: ['last']
    },
  },
  plugins: [],
}
