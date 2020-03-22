<script>
export default {
    data() {
        return {
            // 筛选项配置
            searchConfig: {
                data: [
                    {
                        type: 'input',
                        model: 'projectId',
                        modelValue: 'test'
                    }
                ]
            },
            // 表格配置
            tableConfig: [
                {
                    label: '1',
                    prop: 'name'
                },
                {
                    label: '2',
                    prop: 'description',
                    align: 'left'
                },
                {
                    label: '3',
                    prop: 'updateTime',
                    format(v) {
                        return v + '...';
                    }
                },
                {
                    label: '操作',
                    render: (h, scope) => <el-button type="primary" size="small" on-click={() => this.handleUpdate(scope.row)}>更新</el-button>
                }
            ]
        };
    }
};
</script>
<template lang="pug">
    div
        p(style="font-size: 20px;color: #333;margin-top: 12px") List

        table-search(
            ref="table"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            :getDataAPI="$serv.list"
            )
</template>

