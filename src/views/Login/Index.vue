<template>
    <div class="login-wrap">
        <div class="login-header">
             <span class="logo"></span>
            <span class="line"></span>
            <span class="name">管理系统</span>
        </div>
        <div class="login-content">
            <div class="login-left">
                <img :src="bg" />
                <!-- login-left-background-img -->
            </div>
            <div class="login-right">
                <div class="right-header">
                    <span>账号登录</span>
                </div>
                <div class="right-content">
                    <div class="account-password">
                        <span class="account-icon"></span>
                        <input v-model="account" type="text" class="input-style" placeholder="请输入帐号" maxlength="35" autocomplete="off">
                    </div>
                    <div class="account-password">
                        <span class="password-icon"></span>
                        <input v-model="pwd" type="password" class="input-style" placeholder="请输入密码" maxlength="25" autocomplete="off">
                    </div>
                    <div class="auto-login">
                        <span>
                            下次自动登录
                            <span class="auto-login-icon" :class="{active: isAutoLogin}" @click="isAutoLogin = !isAutoLogin"></span>
                        </span>
                    </div>
                </div>
                <div class="right-footer">
                    <button class="login-btn" @click="login">立即登录</button>
                    <span class="login-comments">遇到账号问题或操作问题，您可随时致电客户经理或拨打客服热线&nbsp;<em style="color: red;">{{$store.state.tel}}</em></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            isAutoLogin: false,
            account: '',
            pwd: '',
            bg: require('./images/background-img.png')
        };
    },
    methods: {
        async login() {
            const params = {};
            params.accountName = this.account;
            params.password = this.pwd;
            params.isRememberMe = this.isAutoLogin;

            await this.$serv.login(params);
            this.$notifyOk('登录成功！');
            this.$router.push('/index');
        }
    }
};

</script>

<style lang="stylus" scoped>
input:-webkit-autofill
    -webkit-box-shadow 0 0 0 1000px white inset
.login-wrap
    background-image linear-gradient(0deg, #56555B 0%, #3B3A3F 100%)
    width 100%
    height 100%
    margin 0
    padding 0
    font-family microsoft yaheilight
    .login-header
        width 100%
        height 200px
        text-align center
        line-height 200px
        .logo
            background url('./images/logo.png') no-repeat
            background-size 185px 40px
            display inline-block
            width 185px
            height 40px
            vertical-align middle
        .line
            position relative
            top 2px
            display inline-block
            margin 0px 15px
            font-size 0
            padding 15px 0
            border-left 1px solid #d8d8d8
            vertical-align middle
        .name
            display inline-block
            font-size 30px
            color #D8D8D8
            vertical-align middle
            font-family PingFangSC-Regular
    .login-content
        width 820px
        height 500px
        background #FFFFFF
        border-radius 4px
        box-shadow 0 5px 18px 0 rgba(0,0,0,0.50)
        margin 0 auto
        overflow hidden
        .login-left
            float left
            width 350px
            height 100%
            border-radius-top-left 4px
            border-radius-bottom-left 4px
            background-size 350px 100%
            font-size 0
            .img
                width 100%
                height 100%
                border-radius-top-left 4px
                border-radius-bottom-left 4px
        .login-right
            margin-left 350px
            height 100%
            .right-header
                width 100%
                height 120px
                text-align center
                line-height 120px
                font-size 24px
                color #3B3A3F
                font-weight bold
            .right-content
                height 185px
                .account-password
                    margin 0 auto
                    width 330px
                    position relative
                    .input-style
                        width 100%
                        display inline-block
                        height 60px
                        box-sizing border-box
                        font-size 14px
                        padding 15px 0 0 28px
                        border none
                        border-bottom 1px solid #D5D5D5
                        outline none
                    span
                        position absolute
                        top 30px
                        left 2px
                        &.account-icon:before
                            content ''
                            background url('./images/account.png') no-repeat
                            background-size 14px 14px
                            display inline-block
                            width 14px
                            height 14px
                        &.password-icon:before
                            content ''
                            background url('./images/password.png') no-repeat
                            background-size 14px 14px
                            display inline-block
                            width 14px
                            height 14px
                .auto-login
                    margin 0 auto
                    width 330px
                    height 65px
                    box-sizing border-box
                    line-height 50px
                    span
                        margin-left 22px
                        font-size 12px
                        color #999999
                        line-height 12px
                        position relative
                        .auto-login-icon
                            content ''
                            background url('./images/auto-login-normal.png') no-repeat
                            background-size 12px 12px
                            display inline-block
                            width 12px
                            height 12px
                            cursor pointer
                            position absolute
                            top 2.5px
                            left -42px
                            &.active
                                background url('./images/auto-login-success.png') no-repeat
                                background-size 12px 12px
            .right-footer
                text-align center
                .login-btn
                    border-radius 2px
                    cursor pointer
                    box-sizing border-box
                    outline none
                    color #fff
                    background-color #FC634D
                    border 1px solid #E9533E
                    width 330px
                    height 40px
                    display block
                    margin 10px auto
                    font-size 16px
                    line-height 16px
                    &:hover
                        background-color #E9533E
                .login-comments
                    width 264px
                    display block
                    margin 20px auto 0
                    font-size 12px
                    color #999
                    line-height 18px
@media screen and (max-height: 768px) {
    .login-wrap {
        .login-header {
            height: 112px;
            line-height: 112px;
        }
    }
}
</style>
