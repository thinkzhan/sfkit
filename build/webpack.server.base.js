const { resolve, getEntries, getAlias } = require('./utils');
const config = require('../config/build').server;

module.exports = {
    entry: getEntries('ssr'),
    output: {
        path: config.path,
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules/,
            },
            {
                test: /\.(svg|eot|woff2?|ttf|otf)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'fonts/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'images/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'isomorphic-style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    resolve: {
        modules: [resolve('node_modules')],
        alias: getAlias(),
    },
};
