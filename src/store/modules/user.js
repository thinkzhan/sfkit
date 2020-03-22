export default {
    namespaced: true,
    state: {
        adminInfo: {
            username: '',
            userEmail: '',
            adminId: ''
        },
        systemAuth: []
    },
    mutations: {
        SET_ADMIN_INFO(state, data) {
            state.adminInfo = Object.assign(state.adminInfo, data);
        },
        SET_SYS_AUTH(state, data) {
            state.systemAuth = Object.assign(state.systemAuth, data);
        }
    },
    getters: {
        adminInfo: state => state.adminInfo,
        systemAuth: state => state.systemAuth
    }
};
