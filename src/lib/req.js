/**
 *** 将lib/fetch请求Currying，可少传一个参数
 *** ---before---
 *** list: params => req.get(`/list`, params)
 *** ---after---
 *** list: req.get(`/list`)
 **/
import fetch from './fetch';

const req = {};
['get', 'post', 'jsonp'].forEach(method => {
    req[method] = function(url, config) {
        return function(params) {
            return fetch[method](url, params, config);
        };
    };
});

['put', 'delete'].forEach(method => {
    req[method] = function(url, config) {
        config = { ...config, type: method };
        return function(params) {
            return fetch.__req(url, params, config);
        };
    };
});

export const { get, post, put, jsonp, delete : del } = req;
export default req;
