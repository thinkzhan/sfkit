import { resolve } from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import Send from 'koa-send';
import renderExtend from './extend/render';
import Route from './decorator/router';

const app = new Koa();
const router = new Router();
renderExtend(app);

/* 静态serve */
router.get('/public/*', async(ctx, next) => {
    await Send(ctx, ctx.path, { root: resolve(__dirname, '../') });
});
app.use(router.routes());
app.use(router.allowedMethods());

new Route(app, resolve(__dirname, './controller')).init();

export default app;
