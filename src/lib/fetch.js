
import sfax from 'sfax';

const isMock = url => {
    return !!/MOCK/.test(/^(http(s)?|\/|\/\/)/.test(url) ? url : `${sfax.baseUrl}/${url}`);
};

export default {
    get(...args) {
        return this.__req(...args);
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
        return sfax({
            url,
            data: payload,
            type: isMock(url) ? 'get' : type,
            contentType: 'application/json;charset=UTF-8',
            withCredentials: true,
            ...config
        })
    }
};
