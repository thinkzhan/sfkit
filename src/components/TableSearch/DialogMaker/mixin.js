export default {
    data() {
        return {
            dialogConfig: {
                visible: false,
                title: '新建',
                data: {}
            },
            dialogUpdateAPI: '',
            dialogAddAPI: ''
        };
    },

    methods: {
        showDialog({
            title = '新建', data = {},
            update = false, width
        }) {
            this.dialogConfig = {
                visible: true,
                title,
                update,
                data: {
                    ...data
                },
                width
            };
        },
        closeDialog() {
            this.dialogConfig.visible = false;
        },
        // 编辑成功回调
        async onDialogUpdate(params) {
            if (this.dialogUpdateAPI) {
                await this.dialogUpdateAPI(params);
            }
            this.dialogConfig.visible = false;
            this.search && this.search();
            this.$notify({
                title: '成功',
                message: '成功',
                type: 'success',
                duration: 1000
            });
        },
        // 新建成功回调
        async onDialogAdd(params) {
            if (this.dialogAddAPI) {
                await this.dialogAddAPI(params);
            }
            if (this.pageInfo) {
                this.pageInfo.pageNo = 1;
            }
            this.dialogConfig.visible = false;
            this.search && this.search();
            this.$notify({
                title: '成功',
                message: '成功',
                type: 'success',
                duration: 1000
            });
        }
    }
};
