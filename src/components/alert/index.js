import Vue from 'vue';

const AlertCmp = Vue.extend(require('./alert.vue'));

let instance;

// 暂存全局唯一实例， 在fetch.js统一弹窗处理错误，逻辑重写时不至于弹窗2次
window.GLOBAL_ALERT_INSTANCE = null;

const Alert = function(options = {}) {
    if (window.GLOBAL_ALERT_INSTANCE) {
        window.GLOBAL_ALERT_INSTANCE.close();
    }
    instance = new AlertCmp({
        data: options
    });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);

    window.GLOBAL_ALERT_INSTANCE = instance;
    return instance.vm;
};
Alert.error = function(message) {
    Alert({
        type: 'error',
        message
    });
};

Alert.success = function(message, fn) {
    Alert({
        type: 'success',
        message,
        onClose: fn
    });
};
module.exports = Alert;
