import headerConifg from '@/config/header';

export default {
    state: {
        header: {
            ...headerConifg,
            userName: ''
        },
        nav: []
    },
    mutations: {
        SET_HEADER(state, header) {
            state.header = {
                ...state.header,
                ...header
            };
        },

        SET_NAV(state, nav) {
            state.nav = nav;
        }
    },
    getters: {
        config: state => {
            return {
                header: state.header,
                nav: state.nav
            };
        }
    }
};
