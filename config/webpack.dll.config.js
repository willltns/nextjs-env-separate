const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'scheduler',
      'redux',
      'react-redux',
      'redux-thunk',
      'immer',
      'axios',
      'js-cookie',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../assets/dll'),
    filename: '[name].[contenthash:8].js',
    library: '[name]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../assets/dll', '[name]-manifest.json'),
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, '../assets/dll'),
    }),
    process.env.npm_config_analyze === 'true' && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
}
