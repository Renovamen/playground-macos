module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      vscode: "#1E1E1E"
    })
  },
  plugins: [require("nightwind")]
};
