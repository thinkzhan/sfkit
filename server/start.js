const moduleAlias = require('module-alias');
const webpackConfig = require('../build/webpack.server.base');
// 配置别名
moduleAlias.addAliases(webpackConfig.resolve.alias);
require('@babel/register')({});

const app = require('./app').default;
const port = process.env.port || 8000;

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('listening on port %s', port);
    }
});
