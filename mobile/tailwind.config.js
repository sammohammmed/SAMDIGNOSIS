/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F3D3E',
        secondary: '#1B877A',
        accent: '#4FD1C5',
        surface: '#F7FAFC',
        warning: '#F6AD55',
      },
    },
  },
  plugins: [],
};
