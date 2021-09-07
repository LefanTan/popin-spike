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
        secondary: {
          100: '#db838b',
          200: '#d6717a',
          300: '#d1606a',
          400: '#bd2f3c',
          500: '#b84650',
          600: '#a33e47',
          700: '#8f373e'
        },
        primary: {
          100: '#fcfcfc',
          200: '#f2eded',
          300: '#d4cfcf',
          400: '#b5b0b1',
          500: '#959192',
          600: '#686666',
          700: '#4b4949',
          800: '#2d2b2c',
          900: '#323031'
        },
        shade: {
          100: '#ebe4e5'
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
