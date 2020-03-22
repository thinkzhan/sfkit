/**
 * 此由配置文件和Layout相关，不能随意更改
 * tab: false 表示该页面不在一级横向菜单显示
 * subMenu: false 表示该页面不在二级竖向菜单显示
 * meta: { todo: true } 表示该页面正在开发中
 */
const view = require('../views/Layout/AliveView');

const routers = [
    {
        path: '/',
        redirect: '/index',
        component: require('../views/Layout/Frame'),
        children: [
            {
                path: 'index',
                name: '首页',
                component: view,
                children: [
                    {
                        path: '/',
                        component: require('../views/Index/Index'),
                        subMenu: false
                    }
                ]
            },
            {
                path: 'demo1',
                name: 'demo1',
                component: view,
                children: [
                    {
                        path: '/',
                        name: '列表',
                        component: require('../views/Content/Index')
                    }
                ]
            },
            {
                path: 'demo2',
                name: 'demo2',
                component: view, meta: { todo: true }
            },
            {
                path: 'account',
                tab: false,
                component: view,
                children: [
                    {
                        path: 'modifyPassword',
                        meta: 'modifyPassword',
                        component: require('../views/Account/Pwd'),
                        name: '修改密码'
                    }
                ]
            },
            {
                path: 'help',
                tab: false,
                component: view,
                children: [
                    {
                        path: '/',
                        name: '使用手册',
                        component: require('../views/Account/Help')
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        component: require('../views/Login/Index')
    },
    {
        path: '/*',
        redirect: '/index'
    }
];
export default routers;
