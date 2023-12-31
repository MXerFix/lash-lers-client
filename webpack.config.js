const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack')
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV == "development";
const GLOBAL_CSS_REGEXP = /\.global\.css$/;

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },

  mode: NODE_ENV ? NODE_ENV : "development",

  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    assetModuleFilename: "assets/[name][hash][ext][query]",
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
        exclude: GLOBAL_CSS_REGEXP,
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ["style-loader", "css-loader",'postcss-loader'],
      },
      {
        test: /\.(jpg|svg|png|jpeg|JPG)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({ template: path.resolve(__dirname, "index.html") }),
    new Dotenv({
      path: './.env',
      safe: true,
    }),
  ],

  devServer: {
    port: 3510,
    open: false,
    hot: IS_DEV,
    historyApiFallback: true,
  },

  devtool: false,
};
