import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loading: false,
        userInfo: {
            'userId': 1,
            'projectId': 1,
            'projectName': '',
            'nickName': '',
            'bindStatus': 0,
            'appName': null,
            'qrCodeUrl': null
        },
        tel: '400-032-7302'
    },
    mutations: {
        lock(state) {
            state.loading = true;
        },
        unlock(state) {
            state.loading = false;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        clearUserInfo(state) {
            state.userInfo = {};
        }

    },
    modules: {}
});

export default store;
