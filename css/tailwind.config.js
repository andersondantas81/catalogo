/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
          'primary': '#696969',
          'bg-card': '#137338',
          'background': '#fcfcff',
          'bg-voltar': '#2fbc83',
          'navbar': '#2ebc4c',     
      },
      fontFamily: {
        'custom': ['Kanit', 'sans-serif']
      }
    },
  },
  plugins: [ ],
}

