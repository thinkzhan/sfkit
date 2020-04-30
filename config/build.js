const path = require('path');
const resolve = dir => path.resolve(__dirname, '../', dir);

module.exports = {
    server: {
        public: resolve('public'),
        path: resolve('public/server')
    },
    client: {
        development: {
            path: resolve('public'),
            publicPath: '/',
            port: '9000'
        },
        production: {
            path: resolve('public/client'),
            publicPath: '/public/client/',
        }
    }
};
