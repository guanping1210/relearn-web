const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    entry: {
        hello: [
            path.join(process.cwd(), './src/server/index.js')
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
        filename: '[name].ssr.js',
        path: path.join(process.cwd(), './server/ssr'),
        libraryTarget: 'commonjs',
    },
    plugins: [],
    devtool: 'source-map',
    module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: path.resolve(__dirname, 'node_modules')
          },
          {
            // 忽略掉 CSS 文件
            test: /\.(less|css|sass)$/,
            use: ['ignore-loader'],
          }
        ]
    }
}


export default serverConfig