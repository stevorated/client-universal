const path = require('path')
const webpack = require('webpack')

const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const clientConfig = {
  entry: './src/browser/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'build/public'),
    publicPath: '/build/public' 
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: true
    })
  ],
}

const serverConfig = {
  target: 'node',
  entry: './src/server/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: false
    })
  ],
}

module.exports = [ merge(baseConfig, clientConfig), merge(baseConfig, serverConfig) ]