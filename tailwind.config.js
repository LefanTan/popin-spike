/** 
 * NOTE: Not a fan of this setup, basically there's two source of truth, this file for tailwind and NativeBaseTheme for native base components. 
 * When you update the theme for one, you have to make sure the other gets updated too
*/

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ec929a',
          200: '#e46772',
          300: '#dd3c49',
          400: '#dc3745',
          500: '#c32230',
          600: '#981b25',
          700: '#6d131b'
        },
        secondary: {
          100: '#fcfcfc',
          200: '#dfdadb',
          300: '#c6c2c2',
          400: '#aea9aa',
          500: '#959192',
          900: '#323031'
        }
      },
      fontFamily: {
        primary_300: ['Quicksand-Light'],
        primary_400: ['Quicksand-Regular'],
        primary_500: ['Quicksand-Medium'],
        primary_600: ['Quicksand-Semibold'],
        primary_700: ['Quicksand-Bold']
      }
    }
  },
  variants: {
    extend: {
    }
  },
  plugins: "",
}
