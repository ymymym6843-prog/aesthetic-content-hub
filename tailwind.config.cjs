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
          'orange-dark': '#C85828',
          beige: '#F5E8D0',
          cream: '#FAF4EA',
          brown: '#2C1810',
          'brown-dark': '#1A1410',
          'brown-mid': '#6B4830',
          gold: '#D4A04A',
          muted: '#9B8A7A',
          'warm-white': '#FFF8F0',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Pretendard', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
