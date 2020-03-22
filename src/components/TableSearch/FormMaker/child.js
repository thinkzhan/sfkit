/**
 * 类似select组件等有子组件，单独处理
*/
import { getChildName } from './default';

export default {
    inputsearch,
    select,
    radio: radioCheckbox,
    checkbox: radioCheckbox,
    table: table
};

function inputsearch(h, item) {
    const self = this;
    return h(`el-button`, {
        props: {
            type: "primary",
            icon: "el-icon-search"
        },
        slot: "append",
        on: {
            click() {
                item.onChange? item.onChange(self.formModel, item) : self.$emit('change', self.formModel, item);
            }
        }
    }, [h('span', '搜索')]);
}

function select(h, item) {
    if (typeof item.list === 'function') {
        const tmp = item.list();
        if (tmp.then) {
            tmp.then(d => {
                item.list = d;
            });
        } else {
            item.list = tmp;
        }
    } else {
        if (item.selectType === 'keyValue') {
            return Object.keys(item.list).map(key => {
                return h(getChildName(item.type), {
                    props: {
                        value: String(key),
                        label: item.list[key]
                    }
                });
            });
        } else {
            return item.list.map(v => {
                return h(getChildName(item.type), {
                    props: {
                        value: String(v.id),
                        label: v.name
                    }
                });
            });
        }
    }
}

function radioCheckbox(h, item, config) {
    const self = this;
    if (typeof item.list === 'function') {
        const tmp = item.list();
        if (tmp.then) {
            tmp.then(d => {
                item.list = d;
            });
        } else {
            item.list = tmp;
        }
    } else {
        if (item.selectType === 'idName') {
            return item.list.map(item => {
                item.id = String(item.id);
                if (item.vIfList && !item.vIfList(self.formModel, item.name, item.id)) {
                    return null;
                }
                return h(`el-${item.type}`, {
                    props: {
                        key: item.id,
                        label: item.id,
                        disabled: typeof item.disabledList === 'function' ?
                            item.disabledList(self.formModel, item.name, item.id)
                            : config.update && item.disabled
                    }
                }, [h('span', item.name)]);
            });
        } else {
            return Object.keys(item.list).map(key => {
                key = String(key);
                if (item.vIfList && !item.vIfList(self.formModel, item.list[key], key)) {
                    return null;
                }
                return h(`el-${item.type}`, {
                    props: {
                        key: key,
                        label: key,
                        disabled: typeof item.disabledList === 'function' ?
                            item.disabledList(self.formModel, item.list[key], key)
                            : config.update && item.disabled
                    }
                }, [h('span', item.list[key])]);
            });
        }
    }
}

function table(h, item) {
    return item.list.map(v => {
        return h(getChildName(item.type), {
            props: {
                label: String(v.label)
                // prop: v.prop
            },
            scopedSlots: {
                default: scope => h('span', {
                    domProps: {
                        innerHTML: v.format ? v.format(scope.row[v.prop], scope.row) : scope.row[v.prop]
                    }
                })
            }
        });
    });

}
