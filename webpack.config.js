const path = require("path");

module.exports = {
  entry: { "linqjs.min": path.resolve(__dirname, "src", "linqjs.js") },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
};