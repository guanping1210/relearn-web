const merge = require('webpack-merge')
const ManifestPlugin = require("webpack-manifest-plugin");

const config = require('./webpack.base.config')

module.exports = merge(config, {
    entry: {
        index: './src/client'
    },
    output: {
        path: path.resolve(__dirname, './distClient')
    },
    plugins: [new ManifestPlugin()]
})