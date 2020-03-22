/**
*** 弹窗编辑
*** 1、简单表单编辑配合FormMaker
        dialog-maker(
            :config="dialogConfig"
            :formConfig="formConfig" // formConfig结构见FormMaker
            @update=""
            @add=""
        )
*** 2、slot自定义，slot优先级高于formConfig
        dialog-maker(
            :config="dialogConfig"
        )
            template(slot-scope="scope")
                div {{scope.dialogConfig}}
            // div 不需要scope
**/

<template lang="pug">
el-dialog.dialog.dialog-edit(
  :title="config.title"
  :visible.sync="config.visible"
  :width="config.width || '440px'"
  :append-to-body="true"
  :close-on-click-modal="false"
  )
    slot(:dialogConfig="config")
        form-maker(
            ref="FormMaker"
            v-model="form"
            :config="formConfig"
        )
        div.dialog-edit__operate
            el-button(type="primary" @click="submitForm") {{config.update ? '确定' : '添加'}}
            el-button(@click="config.visible = false") 取消
</template>

<script>
import FormMaker from '../FormMaker/index.js';

export default {
    components: { FormMaker },
    props: {
        // dialog相关配置
        config: {
            type: Object,
            default() {
                return {
                    visible: false,
                    title: '新建',
                    update: false,
                    width: '440px',
                    data: {} // 数据可以覆盖formConfig.data，比如传入编辑数据
                };
            }
        },
        // dialog中默认使用FormMaker相关配置
        formConfig: {
            type: Object,
            default() {
                return {
                    data: [],
                    ui: {},
                    rule: {
                        beforeSubmitForm: null // el-form rule中自定义beforeSubmitForm提交前规则
                    }
                };
            }
        }
    },
    data() {
        return {
            form: {}
        };
    },
    watch: {
        'config.visible'(val) {
            if (val && this.$refs.FormMaker && this.$refs.FormMaker.$refs['form']) {
                this.$refs.FormMaker.$refs['form'].resetFields();
            }
            // if (!val) {
            //     this.form = {};
            // }
            this.formConfig.update = this.config.update;
        },
        'config.data'(val) {
            if (val) {
                setTimeout(() => {
                    this.form = { ...this.form, ...val };
                }, 0);
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.FormMaker.$refs['form'].validate(valid => {
                if (valid) {
                    if (this.formConfig.rule && this.formConfig.rule.beforeSubmitForm) {
                        if (!this.formConfig.rule.beforeSubmitForm(this.form)) {
                            return false;
                        }
                    }
                    this.$emit(this.config.update ? 'update' : 'add', this.form);
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
.dialog-edit
    &__operate
        margin-top: 30px
        text-align: center
</style>
