const path = require('path');
const webpack = require('webpack');

module.exports = {
  /*
   * The entry point for the bundle
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  context: path.resolve(__dirname, '../src/app'),
  entry: {
    'imlazy': './app.js',
  },

  /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    path: path.resolve(__dirname, '../src/bin'),
    publicPath: '/bin/',
    filename: '[name].pkgd.js'
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: 'es2015'
        }
      }
    ]
  },
  jshint: {
    esversion: 6
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
  ]
};
