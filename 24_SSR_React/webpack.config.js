const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader:'babel',
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'ssr test',
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
    ]
}