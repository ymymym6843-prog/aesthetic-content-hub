/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E8703A',
          'orange-light': '#F5A070',
          beige: '#F5EDE0',
          cream: '#FFF8F0',
          brown: '#3D2E24',
          'brown-mid': '#6B5B4E',
          gold: '#D4A04A',
          muted: '#9B8A7A',
          'warm-white': '#FFF8F0',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        accent: ['Pretendard', '-apple-system', 'sans-serif'],
        sans: ['Pretendard', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
