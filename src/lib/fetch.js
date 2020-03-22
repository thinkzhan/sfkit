/**
 *
 * 全局拦截了错误弹窗
**/
import sfax from 'sfax';
import Alert from 'com/alert/index';

function noAuth() {
    console.log('无权限');
    Alert({
        type: 'error',
        message: '无权限，请联系管理员!'
    });
}

const successCb = (res, url = '') => {
    if (/city\/(list|province|district)/.test(url) && res.code === 1) {
        return Promise.resolve(res.data);
    }
    if (res.code == 1) {
        // toLogin();
        return Promise.reject('未登录');
    }
    if (res.code == 2) {
        noAuth();
        return Promise.reject('无权限');
    }
    if (res.code !== 200 && res.errorCode !== 0) {
        Alert({
            type: 'error',
            message: res.message || res.msg || res.errorMessage || '网络错误，请稍后重试'
        });
        return Promise.reject(res);
    }

    return Promise.resolve(res.data);
};
const failCb = res => {
    Alert({
        type: 'error',
        message: res.status || '网络错误，请稍后重试！'
    });
    return Promise.reject(res);
};
const isMock = url => {
    return !!/MOCK/.test(/^(http(s)?|\/|\/\/)/.test(url) ? url : `${sfax.baseUrl}/${url}`);
};

export default {
    get(url, payload, config) {
        return this.__req(url, payload, config);
    },

    post(url, payload, config) {
        return this.__req(url, payload, {
            contentType: 'application/x-www-form-urlencoded'
        }, 'post');
    },

    jsonp(url, payload) {
        return this.__req(url, payload, {
            jsonp: !isMock(url)
        });
    },

    __req(url, payload, config, type = 'get') {        
        return sfax({
            url,
            data: payload,
            type: isMock(url) ? 'get' : type,
            contentType: 'application/json;charset=UTF-8',
            withCredentials: true,
            ...config
        }).then(res => successCb(res, url), res => failCb(res));
    }
};
