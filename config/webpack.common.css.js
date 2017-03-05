const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
  /*
   * The entry point for the bundle
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  context: path.resolve(__dirname, '../src/css'),
  entry: {
    'style': './style.scss'
  },

  /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    path: path.resolve(__dirname, '../src/bin'),
    publicPath: '/bin/',
    filename: '[name].css'
  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: extractCSS.extract(['css-loader!autoprefixer-loader?{browsers:["last 2 version"]}', 'sass-loader'])
      },
    ]
  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    extractCSS
  ]
};
