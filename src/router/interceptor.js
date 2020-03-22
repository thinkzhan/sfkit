/**
 * 统一控制路由权限
 */
import Service from 'serv';
import store from 'store';
import hasAuth from 'lib/hasAuth';

export default function interceptor(router, routerConfs) {
    router.beforeEach(async (to, from, next) => {
        // 已登录放行
        if (router.app.$store) {
            const adminInfo = router.app.$store.getters['user/adminInfo'];
            if (adminInfo.username) {
                next();
                return;
            }
        }
        try {
            const data = await Service.getAdminInfo();
            const systemAuth = await Service.getSystemAuth({
                systemId: 0
            });
            store.commit('user/SET_SYS_AUTH', systemAuth);
            store.commit('user/SET_ADMIN_INFO', data);
            store.commit('SET_HEADER', {
                userName: data.username
            });

            // 以下根据用户角色动态设置路由
            const permissionrouter = filterRouter(router, routerConfs, systemAuth);

            router.addRoutes(permissionrouter);
            router.addRoutes([
                {
                    path: '*',
                    redirect: permissionrouter[0].path,
                    // component: {
                    //     render: h => <div style="">该页面无权限</div>
                    // },
                    hidden: true
                }
            ]);

            store.commit('SET_NAV', permissionrouter);
            next({ ...to, replace: true });
        } catch (err) {
            console.error(err);
        }
    });
}

function filterRouter(router, routerConfs, systemAuth) {
    // 以下根据用户角色动态设置路由, 如果不需要动态设置，直接return routerConfs
    routerConfs.map(r => {
        if (r.children) {
            r.children = filterRouter(router, r.children, systemAuth);
        }
    });

    return routerConfs.filter(r => {
        // btn权限转化为true/false
        if (r.meta && r.meta.btnPermission) {
            Object.keys(r.meta.btnPermission).map(k => {
                r.meta.btnPermission[k] = hasAuth(r.meta.btnPermission[k]);
            });
        }
        return hasAuth(r?.meta?.permission);
    });
}
