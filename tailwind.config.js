/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#b80105",
        "secondary": "#637381",
        "background": "#FAFBFE",
        'modal-background': '#000000BF',
        'neutral-light-grey': '#DEDEDE',
        'dark-grey': '#4E4E4E',
      }
    },
  },
  plugins: [],
}

