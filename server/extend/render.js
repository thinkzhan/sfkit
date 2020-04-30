/** *
 *
 * ctx注入renderServer renderClient
 *
*/
import { join } from 'path';
import views from 'koa-views';
import { server as ServerConfig } from 'Config/build';

export default function(app) {
    app.use(views(join(__dirname, '../../template'), {
        extension: 'ejs'
    }));

    app.context.renderServer = async function(entry, data) {
        let ServerRender;
        if (process.env.START_MODE === 'dev:server') {
            ServerRender = require(`Web/page/${entry}/ssr.js`).default;
        } else {
            ServerRender = require(`${ServerConfig.path}/${entry}.js`).default;
        }
        const renderData = await ServerRender(this);
        const assets = require('Public/assets.json');
        await this.render('index', {
            ...renderData,
            ...data,
            assets,
            pageName: entry
        });
    };
    app.context.renderClient = async function(entry, data) {
        const renderData =  {
            content: '',
            state: {},
        };
        const assets = require('Public/assets.json');
        await this.render('index', {
            ...renderData,
            ...data,
            assets,
            pageName: entry
        });
    };
}
