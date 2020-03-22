/**
*** 场景： 开发阶段辅助
*** 前端开发阶段 独立完成完整逻辑，联调时只在service层完成字段转化即可
*** 配合match.js 在service层同时做好字段定义及字段mock
*** 联调完成应该去掉此逻辑

import match from '@lib/match';
import api from '@lib/proxy';

return api.getAccountList(params).then(data => match(data, {
  list: match([{}, {}], {
    'id': '1',
    'name': 'thinkzhan',
    'contact': 'he',
    'contactTel': '13141287154',
    'city': '青岛',
    'createTime': '2018-01-01<br/>01:01:01'
  }),
  totalCount: 1
}));
**/

const service = Promise.resolve();
const pService = new Proxy(service, {
    get(target, key, receiver) {
        // await拦截不到
        if (key === 'then') {
            return function(func) {
                const res = func();
                console.log('log::proxy_response:', res);
                return Promise.resolve(res);
            };
        }
        return Reflect.get(target, key, receiver);
    }
});

const obj = {};
const pObj = new Proxy(obj, {
    get(target, key) {
        console.log('log::proxy_method:', key);
        return function(...args) {
            console.log('log::proxy_params:', ...args);
            return pService;
        };
    }
});

export default pObj;
