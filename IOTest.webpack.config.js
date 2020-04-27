const path = require('path')
module.exports = {
  entry: './IOTest/index.js',
  output: {
    filename: 'main.js',
  },
  devServer: {
    contentBase: './IOTest'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env'],
          plugins: [require('babel-plugin-transform-object-rest-spread')],
        }
      }
    }]
  }
}