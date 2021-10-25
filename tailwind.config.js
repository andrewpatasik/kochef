module.exports = {
  purge: {
    preserveHtmlElements: false,
    content: [
      './src/**/*.html',
      './src/**/*.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        // eslint-disable-next-line quote-props
        'sans': ['Roboto', 'Sans', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
