const path = require("path");

module.exports = {
  entry: { linqjs: path.resolve(__dirname, "dist", "linqjs.js") },
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