module.exports = {
    ui: { labelWidth: '120px', itemWidth: '300px', inline: false },
    data: [
        {
            type: "input",
            title: "名称",
            model: "name",
            placeholder: "全部",
            list: []
        },
        {
            type: "select",
            selectType: "keyValue",
            title: "状态",
            model: "status",
            placeholder: "选择状态",
            list: []
        }
    ],
    rule: {
        name: [ { required: true, message: '请输入名称', trigger: 'blur' } ]
    }
};
