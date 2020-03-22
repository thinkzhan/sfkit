/**
*** 若第一个参数无属性，从第二个中取
*** Service层用
const Service = proxy({}, {
    method: function() {} // api
})
Service.method()
**/
export default function(service, api) {
    return new Proxy(service, {
        get(target, key, receiver) {
            if (!service[key]) {
                return api[key];
            }
            return Reflect.get(target, key, receiver);
        }
    });
}

