import Confirm from 'com/confirm/index';
import API from 'serv';
import store from 'store';
// import Alert from 'com/alert/index';

export default function(router) {
    router.beforeEach((to, from, next) => {
        // 待开发
        if (to.meta && to.meta.todo) {
            Confirm({
                title: '系统新能力正在搭建中，敬请期待！',
                hideCancel: true,
                confirm: '好的',
                onConfirm() {
                    next(from.path || '/index');
                },
                onCancel() {
                    next(from.path || '/index');
                }
            });
        }

        API.getUser().then(data => {
            store.commit('setUserInfo', data);
            toIndex(to, next);
        }).catch(() => {
            toLogin(to, next, '请先登录！');
        });
    });

    function toLogin(to, next, txt) {
        if ('/login' === to.path) {
            next();
        } else {
            // txt && Alert({
            //     type: 'error',
            //     message: txt
            // });
            next('/login');
        }
    }

    function toIndex(to, next) {
        if ('/login' === to.path) {
            next('/index');
        } else {
            next();
        }
    }
}
