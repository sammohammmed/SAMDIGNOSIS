/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B7FAB',
          light: '#4FB4D9',
          dark: '#065D7D',
        },
        accent: '#1ABC9C',
        success: '#2ECC71',
        warning: '#F39C12',
        danger: '#E74C3C',
        slate: {
          950: '#0f172a',
        },
      },
      boxShadow: {
        card: '0 10px 30px rgba(11, 127, 171, 0.08)',
      },
    },
  },
  plugins: [],
}

