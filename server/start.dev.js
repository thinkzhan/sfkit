const moduleAlias = require('module-alias');
const { exec } = require('child_process');
const webpackConfig = require('../build/webpack.server.base');
require('@babel/register')();

// 静态serve于9000端口
exec('cross-env NODE_ENV=development START_MODE=dev:server webpack-dev-server --config ./build/webpack.client.dev.js', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});

// 忽略require
['.css', '.scss', '.less', '.png', '.jpg', '.gif', '.ttf'].forEach(e => {
    require.extensions[e] = function() {
        return false;
    };
});
// 配置别名
moduleAlias.addAliases(webpackConfig.resolve.alias);

const app = require('./app').default;
const port = process.env.port || 8000;

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('listening on port %s', port);
    }
});
