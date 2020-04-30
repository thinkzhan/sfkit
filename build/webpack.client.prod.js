const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBaseConf = require('./webpack.client.base');
const config = require('../config/build').client.production;

module.exports = webpackMerge(webpackBaseConf, {
    output: {
        path: config.path,
        publicPath: config.publicPath,
        filename: 'js/[name].[hash:5].js',
        chunkFilename: 'js/[name].[hash:5].js',
    },
    mode: 'production',
    devtool: '#eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:5].css',
            chunkFilename: 'css/[id].[hash:5].css',
        })
    ],
    performance: {
        hints: 'warning',
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    },

    optimization: {
        splitChunks: {
            chunks: 'initial',
            automaticNameDelimiter: '.',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10,
                    enforce: true,
                },
                react: {
                    name: 'react',
                    test: module => /react|redux/.test(module.context),
                    chunks: 'initial',
                    priority: 11,
                    enforce: true,
                },
            }
        }
    }
});
