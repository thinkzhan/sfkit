export default {
    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error(e);
            return '';
        }
    },
    set(key, data) {
        try {
            const caches = this.get(key);
            if (caches) {
                return;
            }
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('不支持localStorage就算了');
        }
    },
    remove(key) {
        this.set(key, '');
    }
};
