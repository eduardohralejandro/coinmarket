const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorWepack = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ip = require('ip');

const WEBPACK_PORT = 8080;

const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.[contentHash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['public']
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].css' : '[name].[hash].css',
      chunkFilename: isProduction ? '[id].css' : '[id].[hash].css',
    }),
    new FriendlyErrorWepack({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [
          `The app is running at http://localhost:${WEBPACK_PORT}`,
          `The app is running at http://${ip.address()}:${WEBPACK_PORT}`,
        ],
      }
    })
  ],
  module: {
    rules : [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    quiet: true,
  }
}