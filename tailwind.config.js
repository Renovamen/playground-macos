module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: "class",
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'vscode': '#1E1E1E'
    })
  },
  variants: {
    extend: {},
  },
  plugins: [require("nightwind")]
}
