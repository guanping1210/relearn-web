const merge = require('webpack-merge')
const ManifestPlugin = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");

const config = require('./webpack.base.config')

module.exports = merge(config, {
    target: 'node',
    entry: {
        index: './src/index,js'
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, './distServer')
    },
    enternals: [
        nodeExternals(),
        nodeExternals({
            modulesDir: path.resolve(__dirname, '../../node_modules')
        })
    ]
})