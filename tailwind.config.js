/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(239, 155, 40, 1)',
        primary_hover: 'rgba(239, 155, 40, 0.9)',
      },
    },
  },
  plugins: [],
};
