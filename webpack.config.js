const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    cache: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    }],
                }),
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                },
            },
        ],
    },

    resolve: {
        extensions: ['.js'],
    },

    mode: 'development',

    devServer: {
        hot: true,
    },

    plugins: [
        new ExtractTextPlugin({
            filename: './css/style.css',
        }),
        new HtmlWebpackPlugin({
            title: 'Siarhei_Dziadkou',
            filename: 'index.html',
            template: 'index.html',
            chunks: ['index'],
        }),
    ],
};