const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 3000,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isDevelopment && new CopyWebpackPlugin({ patterns: [{ from: 'public' }] }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'public', 'index.html'),
    // })p
  ].filter(Boolean),
  optimization: {
    minimize: !isDevelopment
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean)
          }
        }
      }
    ]
  }
}