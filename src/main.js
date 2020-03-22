import Vue from 'vue';
import App from './App';
import store from './store';

import './styles/reset.scss';
import './styles/var.scss';
import './styles/common.scss';

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.prototype.$store = store;

Vue.prototype.showToast = msg => {
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
    });
};

Vue.prototype.wxPromise = (api, params = {}) => {
    return new Promise((resolve, reject) => {
        params.success = res => {
            resolve(res);
        };
        params.fail = error => {
            reject(error);
        };
        wx[api](params);
    });
};

const app = new Vue(App);
app.$mount();
