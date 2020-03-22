import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminUI from 'focus-admin-ui';
import Layout from '@/views/layout';
import interceptor from './interceptor';
Vue.use(VueRouter).use(AdminUI);
const router = new VueRouter({});

const routerConfs = [
    {
        path: '/demo',
        redirect: '/demo/list',
        name: '菜单',
        iconfont: '&#xe983;',
        component: Layout,
        children: [
            {
                path: 'list',
                name: '列表',
                component: () => import(/* webpackChunkName: "list" */ '../views/demo/list')
            },
            {
                path: 'detail',
                name: '详情',
                hidden: true,
                component: () => import(/* webpackChunkName: "detail" */ '../views/demo/detail')
            }
        ]
    }
];

interceptor(router, routerConfs);
export default router;
