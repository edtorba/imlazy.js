const jsConfig = require('./webpack.js.config.js');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

module.exports = [ webpackMerge(jsConfig, {
  /**
   * Switch loaders to debug mode.
   *
   * See: http://webpack.github.io/docs/configuration.html#debug
   */
  debug: true,

  /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'source-map',
  stats: {
    // Nice colored output
    colors: true
  }
}) ];
