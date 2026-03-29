/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dde6ff',
          200: '#c3d0fe',
          300: '#9eb0fd',
          400: '#7889fb',
          500: '#5a66f5',
          600: '#4346ea',
          700: '#3835cf',
          800: '#2e2da7',
          900: '#2b2c84',
        },
      },
    },
  },
  plugins: [],
}
