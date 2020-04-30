const webpackMerge = require('webpack-merge');
const webpackBaseConf = require('./webpack.server.base');

module.exports = webpackMerge(webpackBaseConf, {
    mode: 'production',
});
