const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConf = require('./webpack.client.base');
const config = require('../config/build').client.development;

const webpackConf = {
    output: {
        path: config.path,
        publicPath: config.publicPath,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
    },
    mode: 'development',
    devtool: '#eval-source-map',
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        port: config.port,
        contentBase: config.path,
        inline: true,
        historyApiFallback: true,
        hot: true,
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        overlay: {
            error: true,
        },
        proxy: {
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

// 由node start.dev启动
if (process.env.START_MODE && process.env.START_MODE === 'dev:server') {
    webpackConf.output.publicPath = 'http://' + webpackConf.devServer.host + ':' + webpackConf.devServer.port + '/';
}
module.exports = webpackMerge(webpackBaseConf, webpackConf);
