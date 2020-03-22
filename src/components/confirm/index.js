import Vue from 'vue';
const ConfirmCmp = Vue.extend(require('./confirm.vue'));

let instance;

const Confirm = function(options = {}) {
    instance = new ConfirmCmp({
        data: options
    });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    return instance.vm;
};
module.exports = Confirm;
