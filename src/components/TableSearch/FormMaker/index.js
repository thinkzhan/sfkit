/**
*** form表单配置生成 用于TableSearch筛选项和DialogEdit弹窗编辑
*** 原理：根据约定解析config.data产生组件，同时创建字段与组件对应关系
***
form-maker(
    :config="config"              // 配置
    v-model="data"                // 数据
    @change="evtHandler"          // 选项改变时触发
    @inited="evtHandler"          // 初始化完触发
)

config: {
    update: true,
    data: [{
            type: 'input',     // 表单组件类型 type="split"用来强行换行
            title: '邮箱',      // label
            model: 'mail',     // 对应组件v-model
            modelValue: '',    // 对应组件v-model的值
            vIf(form) {        // v-if
                return form.some === 0;
            },
            disabled: true,    // 只在编辑时生效 以下同element属性
            style: {
                width: '100px'
            },
            placeholder: '请输入邮箱',
            ...                // 等等，用到现扩展
        }],
    rule: {},                // el-form表单验证规则
    ui: {
        labelWidth:'100px',  // label宽度
        inline: false        // el-form内联？
    }
}

data: {
    mail: ''
}
**/
import { getStyle, getProps, getComponentName } from './default';
import childComponent from './child';

export default {
    render(h) {
        const self = this;
        const { config } = this;
        const components = config.data.map(item => {
            if (!item.type) {
                return null;
            }

            if (item.vIf && !item.vIf(self.formModel)) {
                return null;
            }
            // 自定义一个p
            if (item.type === 'p') {
                return h('p', {
                    style: item.style,
                    domProps: {
                        innerHTML: item.title
                    }
                });
            }
            // 自定义一个分隔组件
            if (item.type === 'split') {
                return h('el-form-item', {
                    style: {
                        display: 'block',
                        margin: 0,
                        padding: 0,
                        height: 0
                    }
                });
            }
            const func = childComponent[item.type];
            const child = func ? func.call(this, h, item, config) : null;

            return h('el-form-item', {
                props: {
                    label: item.title,
                    prop: item.model
                }
            }, [
                h(getComponentName(item.type), {
                    props: {
                        ...getProps(item.type, item),
                        ...item,
                        // 默认编辑状态时才禁用
                        disabled: typeof item.disabled === 'function' ? item.disabled(self.formModel) : config.update && item.disabled,
                        value: self.formModel[item['model']]
                    },
                    attrs: {
                        ...item
                    },
                    on: {
                        input(v) {
                            self.formModel[item['model']] = v;
                            self.$children[0].$emit('input', v);
                            item.onChange && item.onChange(self.formModel, item);

                            if (item.type === 'input' || item.type === 'inputsearch') {
                                return;
                            }
                            self.$emit('change', self.formModel, item);
                        }
                    },
                    style: {
                        ...getStyle(item.type),
                        ...item.style
                    }
                }, [
                    child
                ])
            ]);
        });
        return h('el-form', {
            ref: 'form',
            props: {
                model: self.formModel,
                rules: config.rule,
                ...config.ui
            }
        }, [
            components
        ]);
    },
    props: {
        config: {
            default() {
                return {
                    data: [],
                    rule: {},
                    ui: {
                        inline: false
                    }
                };
            }
        },
        value: {
            default() {
                return {};
            }
        }
    },
    computed: {
        formModel() {
            return this.value;
        }
    },
    watch: {
        formModel: {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    this.$emit('input', val);
                }
            },
            deep: true
        }
    },
    async created() {
        this.config.data && this.config.data.forEach(m => {
            const v = typeof m.modelValue === 'function' ? m.modelValue() :
                typeof m.modelValue === 'number' ?
                    String(m.modelValue) :  m.modelValue || '';
            this.$set(this.formModel, m.model, v);
        });
        this.$emit('inited');
    }
};
