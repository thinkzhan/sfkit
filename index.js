require('shelljs/global');
var console = require('sfconsole')("vtl-kit", true );

module.exports = {
    init: function(opts) {
        console.info('init seed....');
        exec(`git clone https://github.com/liberalist1991/webpack-velocity-tpl.git ${opts.to}`);
        console.info('install dependencies....');
        console.warn('please wating...');
        exec(`cd ${opts.to||'webpack-velocity-tpl'} && npm install`);
        console.info(`init ${opts.to||'webpack-velocity-tpl'} ok!`);

    }
}
