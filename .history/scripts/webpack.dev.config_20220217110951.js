const path = require('path');
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigDev = {
  mode: 'development',

  entry: {
    app: [resolve('../src/index.js')],
  },

  output: {
    path: resolve('../lib'), 
    filename: 'change-button.js',
  },

  devtool: 'eval-cheap-module-source-map',   

  devServer: {
    static:{
        directory
    },
    hot: true,
    open: true,   
    host: 'localhost',
    port: 8080,
  },
  optimization: {
    moduleIds: 'named'
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html', }),
    
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
