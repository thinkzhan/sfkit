import R from 'ramda';
import KoaRouter from 'koa-router';
import glob from 'glob';
import { resolve, join } from 'path';

const pathPrefix = Symbol('pathPrefix');
const routeMap = [];

const normalizePath = path => path.startsWith('/') ? path : `/${path}`;

const changeToArr = R.unless(
    R.is(Array),
    R.of,
);

export default class Route {
    constructor(app, routesPath) {
        this.app = app;
        this.router = new KoaRouter();
        this.routesPath = routesPath;
    }

    init = () => {
        const { app, router, routesPath } = this;

        glob.sync(resolve(routesPath, './*.js')).forEach(require);

        R.forEach(
            ({ target, method, path, callback }) => {
                const prefix = normalizePath(target[pathPrefix]);
                router[method](join(prefix + path), ...callback);
            }
        )(routeMap);
        app.use(router.routes());
        app.use(router.allowedMethods());
    }
}

export const Controller = path => (target, key, descriptor) => {
    target.prototype[pathPrefix] = path;
    return descriptor;
};

export const setRouter = method => path => (target, key, descriptor) => {
    routeMap.push({
        target,
        method,
        path: normalizePath(path),
        callback: changeToArr(target[key]),
    });

    return descriptor;
};

export const Get = setRouter('get');

export const Post = setRouter('post');

export const Put = setRouter('put');

export const Delete = setRouter('delete');
