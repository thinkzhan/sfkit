'use strict';
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const config = require('../config/build');

const resolve = dir => path.resolve(__dirname, '../', dir);

exports.resolve = resolve;

const PAGE_PATH = resolve('web/page');
const pages = fs.readdirSync(PAGE_PATH);

exports.getEntries = entry => {
    var map = {};
    pages.forEach(page => {
        const file = path.resolve(PAGE_PATH, page, `${entry}.js`);
        if (fs.existsSync(file)) {
            map[page] = file;
        }
    });
    return map;
};

exports.getAlias = () => ({
    'Build': resolve('build'),
    'Config': resolve('config'),
    'Web': resolve('web'),
    'Server': resolve('server'),
    'Public': resolve('public'),
    'Template': resolve('template')
});

exports.htmlPlugin = () => {
    const arr = [];
    pages.forEach(page => {
        let conf = {
            template: resolve('template/index.html'),
            filename: path.resolve(config.client.production.path, page + '.html'),
            chunks: [
                'vendor',
                'react',
                page
            ],
            inject: true
        };
        if (process.env.NODE_ENV === 'development') {
            conf = merge(conf, {
                filename: path.resolve(config.client.development.path, page + '.html'),
            });
        }
        arr.push(new HtmlWebpackPlugin(conf));
    });
    return arr;
};
