import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const moduleContext = require.context('./modules/', false, /\.js$/);
const keys = moduleContext.keys();
const modules = {};

keys.forEach(item => {
    modules[
        item
            .split('/')
            .pop()
            .split('.')[0]
    ] = moduleContext(item).default;
});
const store = new Vuex.Store({
    modules
});
export default store;
