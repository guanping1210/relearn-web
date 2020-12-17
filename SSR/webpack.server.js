const path = require('path')

const serverConfig = {
    target: 'node',
    entry: './src/server/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, './node_modules')
                ]
            }
        ]
    }
}