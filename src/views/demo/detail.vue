<template lang="pug">
div
    form-maker(
        ref="FormMaker"
        v-model='form'
        :config='formConfig'
    )
    el-button(type="primary" @click="add" style="margin-left:100px") 增加

</template>
<script>
import FormMaker from 'com/TableSearch/FormMaker/index.js';
import formConfig from './form';
export default {
    components: { FormMaker },
    data() {
        return {
            form: {},
            formConfig
        };
    },
    methods: {
        add() {
            this.$refs.FormMaker.$refs['form'].validate(async valid => {
                if (valid) {
                    await this.$serv.demoUpdate(this.form);
                    this.notifyOk('成功');
                }
            });
        }
    }
};
</script>
