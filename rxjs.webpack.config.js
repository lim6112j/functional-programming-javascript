const path = require('path')
module.exports = {
  entry: './rxjs/rxjs.js',
  output: {
    filename: 'main.js',
  },
  devServer: {
    contentBase: './rxjs',
    headers: {
      "Access-Control-Allow-Origin": "0.0.0.0",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
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