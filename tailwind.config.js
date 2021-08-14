module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors:{
            'off-white': '#435c1d'
        }
      }
    },
    variants: {
      extend: {
        scale: ['active']
      }
    },
    plugins: "",
  }
  