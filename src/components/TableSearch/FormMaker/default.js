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
        case 'textarea':
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
        case 'table':
            return 'el-table-column';
        default:
            return null;
    }
};
export const getStyle = (type, ui) => {
    switch (type) {
        case 'select':
            return {
                width: ui && ui.itemWidth ? ui.itemWidth : '120px'
            };
        case 'input':
            return {
                width: ui && ui.itemWidth ? ui.itemWidth : '140px'
            };
        case 'inputsearch':
            return {
                width: ui && ui.itemWidth ? ui.itemWidth :'280px'
            };
        case 'daterange':
            return {
                width: ui && ui.itemWidth ? ui.itemWidth : '290px'
            };
        case 'search-tree':
            return {
                width: ui && ui.itemWidth ? ui.itemWidth : '295px'
            };
        default:
            return {
                width: ui && ui.itemWidth ? ui.itemWidth : ''
            };
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
        case 'textarea':
            props = {
                ...props,
                ...{
                    type: 'textarea'
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
