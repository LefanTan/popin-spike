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
          100: '#e16772',
          200: '#dd515d',
          300: '#d83c49',
          400: '#d42635',
          500: '#bf2230',
          600: '#aa1e2a',
          700: '#941b25'
        },
        secondary: {
          100: '#fcfcfc',
          200: '#f2eded',
          300: '#d4cfcf',
          400: '#b5b0b1',
          500: '#959192',
          600: '#686666',
          700: '#4b4949',
          800: '#2d2b2c',
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
