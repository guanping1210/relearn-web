const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    context: process.cwd(),
    ouput: {
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, './src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'global',
                                localIdentName: '[local]--[hash:base64:5]',
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'static/[name].[hash:8].[ext]'
                        }
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_module/,
                loader: 'ts-loader',
                options: {
                    happyPackMode: true
                }
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
}