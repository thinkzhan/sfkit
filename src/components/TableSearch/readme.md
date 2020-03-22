### table 增删改查
FormMaker + DialogMaker

- 筛选项     searchConfig
- 表格       tableConfig
- 编辑弹窗   formConfig
- 增        addDataAPI
- 删        delDataAPI
- 改        updateDataAPI
- 查        getDataAPI
- 下载      downloadDataAPI

------

```html
<script>
import TableSearch from 'com/TableSearch/TableSearch';
import API from 'serv/login';
import FormRule from './rule';

export default {
    components: {
        TableSearch
    },
    data() {
        return {
            getDataAPI: API.list,
            delDataAPI: API.delete,
            updateDataAPI: API.update,
            addDataAPI: API.add,
            // 筛选项配置
            searchConfig: {
                data: [{
                    type: 'select',
                    selectType: 'keyValue',
                    title: '角色筛选',
                    model: 'role',
                    modelValue: 0,
                    placeholder: '全部',
                    list: {
                        0: '全部', ...this.$store.getters['user/authRoles']
                    }
                }]
            },
            // 表格配置
            tableConfig: [{
                label: "邮箱",
                prop: "mail",
                minWidth: 90
            }, {
                label: "姓名",
                prop: "name",
                minWidth: 90
            }, {
                label: "角色",
                prop: "roleDesc",
                minWidth: 90
            }, {
                label: "操作",
                width: 200,
                action: ['update', 'delete']
            }],
            // 编辑框配置
            formConfig: {
                rule: FormRule,
                ui: {
                    labelWidth: '83px',
                    inline: false
                },
                data: [{
                    type: 'input',
                    title: '邮箱',
                    model: 'mail',
                    disabled: true,
                    style: {
                        width: '297px'
                    },
                    placeholder: '请输入邮箱'
                }, {
                    type: 'input',
                    title: '姓名',
                    model: 'name',
                    style: {
                        width: '297px'
                    },
                    placeholder: '请输入姓名'
                }, {
                    type: 'select',
                    selectType: 'keyValue',
                    title: '角色',
                    model: 'role',
                    style: {
                        width: '297px'
                    },
                    placeholder: '请选择角色',
                    list: {
                        ...this.$store.getters['user/authRoles']
                    }
                }]
            }
        };
    },
    create() {
        // 重写tableSearch方法
        this.$refs.table.deleteRow = async function(row, index) {
            await this.$confirm('是否确认删除？');
            // todo
        };
    }
};
</script>
<template lang="pug">
    div
        div.page-title 权限管理
        table-search(
            ref="table"
            :formConfig="formConfig"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            :getDataAPI="getDataAPI"
            :delDataAPI="delDataAPI"
            :updateDataAPI="updateDataAPI"
            :addDataAPI="addDataAPI"
            )
            template(slot="operate"  slot-scope="scope")
                el-button(type="primary"       @click="scope.search") 查询
                el-button.f-right(
                    type="primary"
                    @click="scope.showDialog({title:'添加权限'})") 添加权限
</template>

```
