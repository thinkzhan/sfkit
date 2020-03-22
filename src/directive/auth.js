/**
 * v-auth="'add'" //pug模版bug
 * jsx:
 *  {...{ directives: [{ name: 'auth', value: 'add' }] }}
 */

export default function(Vue) {
    Vue.directive('auth', {
        inserted(el, binding, vnode) {
            const { btnPermission } = vnode.context.$route.meta;
            if (!btnPermission[binding.value]) {
                el.parentNode.removeChild(el);
            }
        }
    });
}



