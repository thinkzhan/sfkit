const AssetsPlugin = require('assets-webpack-plugin');
const { resolve, getEntries, getAlias, htmlPlugin } = require('./utils');
const config = require('../config/build').server;

module.exports = {
    entry: getEntries('csr'),
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
        ]
    },
    resolve: {
        modules: [resolve('node_modules')],
        alias: getAlias(),
    },
    plugins: [
        // 生成assets map, ssr需要
        new AssetsPlugin({
            filename: 'assets.json',
            path: config.public,
            prettyPrint: true,
        }),
        ...htmlPlugin()
    ]
};
