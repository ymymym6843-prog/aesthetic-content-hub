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
          beige: '#F5E8D0',
          cream: '#FAF4EA',
          brown: '#2C1810',
          'brown-mid': '#6B4830',
          'warm-white': '#FFF8F0',
        }
      }
    },
  },
  plugins: [],
};
