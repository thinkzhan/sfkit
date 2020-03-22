export const getComponentName = type => {
    switch (type) {
        case 'daterange':
            return 'el-date-picker';
        case 'datetimerange':
            return 'el-date-picker';
        case 'checkbox':
            return 'el-checkbox-group';
        case 'radio':
            return 'el-radio-group';
        case 'inputsearch':
            return 'el-input';
        default:
            return `el-${type}`;
    }
};
export const getChildName = type => {
    switch (type) {
        case 'select':
            return 'el-option';
        case 'checkbox':
            return 'el-checkbox';
        case 'radio':
            return 'el-radio';
        default:
            return null;
    }
};
export const getStyle = type => {
    switch (type) {
        case 'select':
            return {
                width: '120px'
            };
        case 'input':
            return {
                width: '140px'
            };
        case 'inputsearch':
            return {
                width: '280px'
            };
        case 'daterange':
            return {
                width: '290px'
            };
        default:
            return {};
    }
};

export const getProps = type => {
    let props = {
        clearable: true
    };
    switch (type) {
        case 'daterange':
            props = {
                ...props,
                ...{
                    'range-separator': "至",
                    'start-placeholder': "开始日期",
                    'end-placeholder': "结束日期",
                    'format': 'yyyy年M月d日',
                    'value-format': 'yyyy-MM-dd',
                    'default-time': ['00:00:00', '23:59:59'],
                    align: "left",
                    editable: false
                }
            };
            break;
        case 'datetimerange':
            props = {
                ...props,
                ...{
                    'range-separator': "至",
                    'start-placeholder': "开始日期",
                    'end-placeholder': "结束日期",
                    'value-format': "yyyy-MM-dd HH:mm:ss",
                    'default-time': ['00:00:00', '23:59:59'],
                    align: "left",
                    editable: false
                }
            };
            break;
        case 'select':
            props = {
                ...props,
                ...{
                    filterable: true
                }
            };
            break;
        default:
    }

    return props;
};
