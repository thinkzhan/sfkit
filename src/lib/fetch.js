/**
 *
 * 全局拦截了错误弹窗，如需自定义，可Notification.closeAll()后自己处理
 * if (res && res.code === 61) {
    Notification.closeAll();
    this.$confirm('自定义error')
*  }
**/
import sfax from 'sfax';
import { Notification } from 'element-ui';
import { toLogin } from 'lib/tool';

const successCb = (res, url = '') => {
    setTimeout(() => {
        window.__post_req_flag = false;
    }, 1000);

    if (/city\/(list|province|district)/.test(url) && res.code === 1) {
        return Promise.resolve(res.data);
    }
    // 未登录
    if (res.code == 1001) {
        toLogin();
        return Promise.reject();
    }

    // 错误消息  如果想自定义错误 可以先Notification.closeAll()
    if (res.code !== 200 && res.errorCode !== 0) {
        Notification({
            title: '错误',
            message: res.message || res.msg || res.errorMessage ||'接口错误',
            type: 'error',
            customClass: 'notification_error'
        });
        window.loading && window.loading.close && window.loading.close();
        return Promise.reject(res);
    }
    return Promise.resolve(res.data);
};
const failCb = res => {
    window.__post_req_flag = false;

    Notification({
        title: '错误',
        message: res.status || '网络错误，请稍后重试！',
        type: 'error',
        customClass: 'notification_error'
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
        /**
        ** post请求统一处理 连续提交
        ** __post_req_flag
        **/
        if (window.__post_req_flag) {
            // 此语法 会强行中止promise
            return new Promise(()=>{});
        }
        window.__post_req_flag = true;
        return this.__req(url, payload, {
            contentType: 'application/json;charset=UTF-8'
        }, 'post');
    },

    jsonp(url, payload) {
        return this.__req(url, payload, {
            jsonp: !isMock(url)
        });
    },

    __req(url, payload, config, type = 'get') {
        console.log(url, payload);
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
