import Vue from 'vue';
import App from './app.vue';
import API from 'api';
import toast from 'lib/toast';

Vue.prototype.$api = API;
Vue.prototype.$toast = toast;
new Vue({
    el: '#app',
    render: h => h(App)
});
