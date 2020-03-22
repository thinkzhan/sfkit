// 判断权限
import store from 'store';

export default function hasAuth(permission, prefix = 'rbac_') {
    const systemAuth = store.getters['user/systemAuth'];
    // 拥有全部权限
    // if (systemAuth.includes(`${prefix}all`)) {
    //     return true;
    // }
    if (!permission) {
        return true;
    }
    if (Array.isArray(permission)) {
        return !!permission.find(p => {
            return systemAuth.includes(`${prefix}${p}`);
        });
    } else {
        return systemAuth.includes(`${prefix}${permission}`);
    }
}
