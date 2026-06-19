/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0a0f1d',
        surface: '#111729',
        edge: '#1e2740',
        accent: '#22d3ee',
      },
    },
  },
  plugins: [],
};