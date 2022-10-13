
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'

  theme: {
    extend: {
      fontFamily: {
        sans: ['Circular Medium, Helvetica'],
        body: ['Circular Book, Helvetica'],
        italic: ['Circular Book Italic, Helvetica'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
