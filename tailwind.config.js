/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      borderColor: {
        DEFAULT: 'black'
      },
      colors: {
        'accent': '#dcf763',
        'accent-darker': '#C5E053',
        'light-bg': '#f1f2ee',
        'primary-light': '#f9f9f9',
        'sec-light': '#bfb7b6',

        'red': '#FE5B63',

        'dark-bg': '#2B2B2B',
        'primary-dark': '#2e2e2e',
        'sec-dark': '#4a4a4a'
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

