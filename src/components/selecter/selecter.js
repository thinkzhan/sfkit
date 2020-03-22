export default {

    data() {
        return {
            status: false,
            curVal: this.value
        };
    },

    props: {

        options: {
            type: Array
        },

        value: {
            default: ''
        },

        width: {
            default: 100
        },

        label: {
            type: String
        },

        valueKey: {
            type: String,
            default: 'value'
        },

        labelKey: {
            type: String,
            default: 'text'
        },

        disabled: {
            default: false
        }
    },

    watch: {
        value(newVal) {
            this.curVal = newVal;
        },
        curVal(newVal) {

            this.$emit('input', newVal);
        },
        options(newVal, oldVal) {
            // 赋默认值
            if (this.value) {
                this.curVal = this.value;
            }
        }
    },

    computed: {
        curLabel() {
            var selected = this.options ? this.options.filter(item => {
                return item[this.valueKey] == this.curVal;
            }) : '';
            return selected && selected[0] ? selected[0][this.labelKey] : '';
        }
    },
    methods: {
        changeSelect(item) {
            this.curVal = item[this.valueKey];
            this.$emit('change', item);
        },

        toggle() {
            this.status = !this.status;
        }
    },

    mounted() {
        var _this = this;

        if (document.addEventListener) {
            document.addEventListener('click', function(e) {
                if (!_this.$el.contains(e.target)) _this.status = false;
            });
        } else {
            document.attachEvent('onclick', function(e) {
                if (!_this.$el.contains(e.target)) _this.status = false;
            });
        }
    }
};
