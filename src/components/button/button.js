export default {
    props: {
        type: {
            type: String,
            default: 'big' //big大 middle 中 small小
        },
        color: {
            type: String,
            default: 'red' //red红色 gray灰色
        },
        txt: {
            type: String,
            default: '确定' //按钮文字
        },
        tips: {
            type: String,
            default: '' //提示
        },
        click: {
            type: Function,
            default: function() {}
        }
    },
    computed: {
        btnStyle() {
            const result = {
                button: true
            };
            //大小
            switch (this.type) {
                case 'big':
                    result.big = true;
                    break;
                case 'middle':
                    result.middle = true;
                    break;
                case 'small':
                    result.small = true;
                    break;
                default:
                    result.middle = true;
            }
            //颜色
            switch (this.color) {
                case 'red':
                    result.red = true;
                    break;
                case 'gray':
                    result.gray = true;
                    break;
                case 'disable':
                    result.disable = true;
                    break;
                default:
                    result.red = true;
            }
            return result;
        }
    },
    data() {
        return {};
    },
    methods: {},
    beforeMount() {}
};
