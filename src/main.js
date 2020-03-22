import Vue from 'vue';
import element from 'element-ui';
import router from './router';
import store from './store';
import app from './app.vue';
import Service from 'serv';
import TableSearch from 'com/TableSearch/TableSearch';
import authDirective from './directive/auth';
import hasAuth from 'lib/hasAuth';

import 'style/index.scss';

// vue
Vue.config.devtools = true;
Vue.use(element);
Vue.prototype.notifyOk = txt => {
    Vue.prototype.$notify({
        title: '成功',
        message: txt,
        type: 'success',
        duration: 1000
    });
};
Vue.prototype.notifyErr = txt => {
    Vue.prototype.$notify({
        title: '错误',
        message: txt,
        type: 'error',
        duration: 1000
    });
};

Vue.prototype.$serv = Service;

Vue.prototype.$auth = function(action = 'add') {
    if (this.$route.meta && this.$route.meta.btnPermission) {
        return this.$route.meta.btnPermission[action];
    } else {
        return hasAuth();
    }
};

Vue.component('TableSearch', TableSearch);

authDirective(Vue);

new Vue({
    el: '#app',
    data: {
        Bus: new Vue()
    },
    router,
    store,
    render(fn) {
        return fn(app);
    }
});
// hide loading
window.document.getElementById('loading').style.display = 'none';
