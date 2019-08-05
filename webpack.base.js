const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { NODE_ENV } = process.env
isProd = (NODE_ENV === 'production') ? true : false

module.exports = {
  // devtool:'inline-source-map',
  devtool: isProd ? 'source-map' : 'inline-source-map',
  mode: NODE_ENV,
  module: {
    rules: [

      {
        test: /\.(css|ttf)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
              hmr: NODE_ENV === 'development',
            },
          },
          {loader: 'css-loader'},
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: [
        'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['last 2 versions']}}], 
              '@babel/preset-react'
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              // Stage 0
              "@babel/plugin-proposal-function-bind",
          
              // Stage 1
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-logical-assignment-operators",
              ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
              ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
              ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
              "@babel/plugin-proposal-do-expressions",
          
              // Stage 2
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-proposal-function-sent",
              "@babel/plugin-proposal-export-namespace-from",
              "@babel/plugin-proposal-numeric-separator",
              "@babel/plugin-proposal-throw-expressions",
          
              // Stage 3
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-syntax-import-meta",
              ["@babel/plugin-proposal-class-properties", { "loose": false }],
              "@babel/plugin-proposal-json-strings",
              ["@babel/plugin-proposal-object-rest-spread"]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      // adjust this path as needed depending on where your webpack config is
      'styled-components': path.resolve('./node_modules/styled-components')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/styles/[name].css',
      chunkFilename: '[id].css',
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  
}