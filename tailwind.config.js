/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'black'
      },
      colors: {
        'green': '#63FE5B',
        'green-darker': '#276524',
        'beige-lighter': '#eeeeee',
        'beige': '#F3F0E6',
        'dark': '#2c2a27',
        'red': '#FE5B63',
        'purple': '#F65BFE',


        'default': '#e3edf7',
        'icon-primary': '#657789',
        'primary': '#8FAADC',
        'primary-darker': '#3C64B1',
        'dark-blue': '#3c4b66',
      },

      boxShadow: {
        custom: '-2px -2px 6px rgba(255,255,255, .8), 3px 3px 12px #c8d8e7',
        'inner-bottom': 'inset -2px -2px 4px rgba(255,255,255, .8)',
        'inner-combined': 'inset 1px 1px 3px #c5d4e3, inset 2px 2px 6px #c5d4e3, inset -2px -2px 4px rgba(255,255,255, .7)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(-67deg, rgba(200, 216, 231, 0.7), rgba(255, 255, 255, 0.8))',
      },
    },
  },
  plugins: [],
}

