<template lang="pug">
    div.modify-password
        div.header
            h1.txt 修改密码
        div.modify-content
            div.form-item.global-clearfix.submit-form
                div.form-left.require.middle 原密码
                div.form-right
                    div.middle
                        input.modify-input(type="password" v-model="modify.old" placeholder="请输入原密码" @blur="validate('old')" autocomplete="new-password")
                    span.global-input-err-tip.modify-error(v-if="modifyError.old.flag") {{modifyError.old.txt}}

            div.form-item.global-clearfix.submit-form
                div.form-left.require.middle(autocomplete="new-password") 新密码
                div.form-right
                    div.middle
                        input.modify-input(type="password" v-model="modify.new" placeholder="请输入新密码" @blur="validate('new')")
                    span.global-input-err-tip.modify-error(v-if="modifyError.new.flag") {{modifyError.new.txt}}

            div.form-item.global-clearfix.submit-form
                div.form-left.require.middle 确认新密码
                div.form-right
                    div.middle
                        input.modify-input(type="password" v-model="modify.newAgain" placeholder="请再次输入新密码" @blur="validate('newAgain')")
                    span.global-input-err-tip.modify-error(v-if="modifyError.newAgain.flag") {{modifyError.newAgain.txt}}

            txt-button.btn-save(type="big" color="red" txt="保存" :click="save")
</template>
<script>
import libValidate from 'lib/validate.js';

export default {
    data() {
        return {
            modify: {
                old: '',
                new: '',
                newAgain: ''
            },
            modifyError: {
                old: {
                    flag: false,
                    txt: '原密码不能为空'
                },
                new: {
                    flag: false,
                    txt: '新密码不能为空'
                },
                newAgain: {
                    flag: false,
                    txt: '确认新密码不能为空'
                }
            }
        };
    },
    computed: {
        salt() {
            return this.$store.state.md5salt;
        }
    },
    methods: {
        clearData() {
            Object.assign(this.$data, this.$options.data());
        },
        passwordType(value) {
            return /^([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,20}$/.test(value);
        },
        validate(type) {
            let flag = false;
            switch (type) {
                case 'old':
                    if (libValidate.isEmpty(this.modify.old)) {
                        this.modifyError.old.flag = true;
                        this.modifyError.old.txt = '原密码不能为空';
                    } else if (!this.passwordType(this.modify.old)) {
                        this.modifyError.old.flag = true;
                        this.modifyError.old.txt = '密码必须由8-20个字符组成，必须包含数字、大写字母和小写字母';
                    } else {
                        this.modifyError.old.flag = false;
                        flag = true;
                    }
                    break;
                case 'new':
                    if (libValidate.isEmpty(this.modify.new)) {
                        this.modifyError.new.flag = true;
                    } else if (!this.passwordType(this.modify.new)) {
                        this.modifyError.new.flag = true;
                        this.modifyError.new.txt = '密码必须由8-20个字符组成，必须包含数字、大写字母和小写字母';
                    } else {
                        this.modifyError.new.flag = false;
                        flag = true;
                    }
                    break;
                case 'newAgain':
                    if (libValidate.isEmpty(this.modify.newAgain)) {
                        this.modifyError.newAgain.flag = true;
                    } else if (!this.passwordType(this.modify.newAgain)) {
                        this.modifyError.newAgain.flag = true;
                        this.modifyError.newAgain.txt =
              '密码必须由8-20个字符组成，必须包含数字、大写字母和小写字母';
                    } else if (this.modify.newAgain !== this.modify.new) {
                        this.modifyError.newAgain.flag = true;
                        this.modifyError.newAgain.txt = '新密码两次输入不一致，请重新输入';
                    } else {
                        this.modifyError.newAgain.flag = false;
                        flag = true;
                    }
                    break;
            }
            return flag;
        },
        save() {
            const validateFlag1 = this.validate('old');
            const validateFlag2 = this.validate('new');
            const validateFlag3 = this.validate('newAgain');
            if (validateFlag1 && validateFlag2 && validateFlag3) {
                this.$serv.pwdUpdate({
                    userId: this.$store.state.userInfo.userId,
                    oldPassword: this.$md5(this.modify.old + this.salt),
                    newPassword: this.$md5(this.modify.new + this.salt)
                }).then(() => {
                    this.$alert({
                        type: 'success',
                        message: '重置密码成功！'
                    });
                    this.clearData();
                });
            }
        }
    }
};

</script>
<style scoped  lang="stylus">
.modify-password
    padding 0px 20px 20px 20px
    .header
        position relative
        height 75px
        line-height 75px
        border-bottom solid 1px #d5d5d5
        box-sizing border-box
        .txt
            font-size 24px
            color #333
.modify-content
    .modify-error
        display block
        height 20px
        line-height 20px
        margin-left -10px;

    .modify-input
        padding-left 10px
        width 310px
        height 40px
        font-size 14px
        color #333
        border 1px solid #D5D5D5
        box-sizing border-box
        -webkit-box-sizing border-box
        -ms-box-sizing border-box
    .btn-save
        margin 30px 0px 60px 128px
        width 150px
        height 50px
        font-weight normal
.form-item
    margin-top 44px
    &.submit-form
        margin-top 20px
    .form-left
        display inline-block
        margin-right 20px
        float left
        width 106px
        text-align right
        font-size 14px
        color #151515
        &.require:before
            display inline-block
            margin-right 2px
            content "*"
            color #FF6246
    .form-right
        position relative
        font-size 14px
        color #333
        overflow hidden
    .middle
        line-height 40px
    .tips
        margin-left 10px
        font-size 14px
        color: #999;
        line-height 40px
    .date-time
        width 310px

</style>

