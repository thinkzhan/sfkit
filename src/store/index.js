import Vue from 'vue';
import Vuex from 'vuex';
import getModule from 'lib/getModule';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: getModule(require.context('./modules/', false, /\.js$/))
});
export default store;
