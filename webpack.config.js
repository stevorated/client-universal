const path = require('path')
const webpack = require('webpack')

const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const { NODE_ENV } = process.env

console.log(NODE_ENV)

const clientConfig = {
  entry: './src/browser/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'build/public'),
    publicPath: '/build/public' 
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
      'process.env.API_BASE': JSON.stringify(process.env.API_BASE),
      'process.env.GRAPH_URL': JSON.stringify(process.env.GRAPH_URL),

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
      __isBrowser__: false,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
}

module.exports = [ merge(baseConfig, clientConfig), merge(baseConfig, serverConfig) ]