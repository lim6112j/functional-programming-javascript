export const entry = "./IOTest/index.js";
export const output = {
  filename: "main.js",
};
export const devServer = {
  contentBase: "./IOTest",
};
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["babel-preset-env"],
          plugins: [require("babel-plugin-transform-object-rest-spread")],
        },
      },
    },
  ],
};
