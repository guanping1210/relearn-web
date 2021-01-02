const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    port: 8000,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        pathRewrite: {
          '^/api': ''
        } 
      }
    }
  }
}