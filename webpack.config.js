const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename:
      env.NODE_ENV === 'production'
        ? '[name].[contenthash].bundle.js'
        : '[name].[hash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './static/fonts',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    host: 'localhost',
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html', //source html
    }),
    new ErrorOverlayPlugin(),
  ],
};
