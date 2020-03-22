export default {
    set(type, val) {
        try {
            wx.setStorageSync(type, val);
        } catch (e) {}
    },
    get(type) {
        try {
            return wx.getStorageSync(type) || '';
        } catch (e) {
            return '';
        }
    },
    clear(type) {
        try {
            wx.setStorageSync(type);
        } catch (e) {}
    },
    clearAll() {
        try {
            wx.clearStorageSync();
        } catch (e) {}
    }
};
