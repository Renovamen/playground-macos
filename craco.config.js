module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")]
    }
  },
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.md$/,
            use: "asset/resource"
          }
        ]
      }
    }
  }
};
