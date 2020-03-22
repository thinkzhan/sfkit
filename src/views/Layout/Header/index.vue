<template lang="pug">
    div.header
        div.section-first
            a.logo(href="#")
            span.line
            span.text {{$store.state.userInfo.projectName}}管理系统
            div.info
                div.name
                    span.company 您好，{{userInfo.nickName}}
                span.line
                router-link(to="/help")
                    div.button.help-wrap
                        span.icon
                        span.txt 帮助
                router-link(to="/account/modifyPassword")
                    div.button.setting-wrap
                        span.icon
                        span.txt 账号管理
                span.line
                span.logout(v-on:click="logout") 安全退出
        div.header-menu.global-clearfix
            div.header-menu-item(:class="[{current: item.current}]" v-on:click="selected(index, item)" v-for="(item, index) in navList")
                router-link(:to="'/' + item.path") {{item.name}}
</template>
<script>
import Conf from '@/router/config';
import Cookie from 'lib/cookie';

exports.data = function() {
    return {
        navList: Conf[0].children.filter(item => item.tab !== false)
    };
};
exports.computed = {
    userInfo() {
        return this.$store.state.userInfo;
    }
};
exports.methods = {
    selected(type) {
        this.navList.forEach(item => {
            if (item.path === type) {
                item.current = true;
            } else {
                item.current = false;
            }
        });
    },

    logout() {
        let tmp;
        this.$serv.logout({}).then(data => {
            this.$alert({
                type: 'success',
                message: '登出成功！'
            });
            if (tmp = Cookie.get('rememberMe')) {
                const cur = new Date();
                cur.setTime(cur.getTime() - 1);
                document.cookie =
                    `rememberMe=${tmp};expires=${cur.toGMTString()}`;
            }
            // this.$store.commit('clearUserInfo');
            // this.$router.push('/login');
            location.href = '/#login';
            location.reload();
        });
    }
};
exports.beforeMount = function() {
    const type = this.$route.matched[1].path.replace('/', '');
    this.selected(type);
};
exports.watch = {
    $route(to, from) {
        const type = to.matched[1].path.replace('/', '');
        this.selected(type);
    }
};
</script>
<style scoped>
.header {
  height: 106px;
  background-color: #3b3a3f;
  border-bottom: solid 4px #ff6246;
  font-family: microsoft yahei;
}
.header .line {
  display: inline-block;
  width: 1px;
  height: 20px;
  background: #666;
  vertical-align: middle;
}
.section-first {
  position: relative;
  height: 60px;
  line-height: 60px;
}
.section-first .text {
  font-size: 18px;
  color: #fff;
  vertical-align: middle;
  margin-left: 15px;
  font-weight: 200;
}
.logo {
  display: inline-block;
  margin: 0 0 0 30px;
  width: 150px;
  height: 30px;
  vertical-align: middle;
  background: url('../images/logo.png') no-repeat;
  background-size: 130px 28px;
}
.info {
  float: right;
  height: 100%;
  margin-right: 20px;
  font-size: 0px;
}
.name {
  position: relative;
  display: inline-block;
  color: #cccccc;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 20px;
  cursor: default;
}
.name .arrow {
  display: inline-block;
  padding: 9px 11px 6px 11px;
  width: 9px;
  height: 5px;
  border-right: solid 1px #666666;
  background: url('../images/arrow.png') center no-repeat;
  vertical-align: middle;
}
.name .company {
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
  letter-spacing: 0px;
  vertical-align: middle;
}
.home {
  position: relative;
  display: inline-block;
  top: -2px;
  padding: 0px 11px;
  width: 24px;
  height: 21px;
  background: url('../images/home.png') center no-repeat;
  vertical-align: middle;
}
.message {
  position: relative;
  display: inline-block;
  padding: 0px 12px;
  width: 22px;
  height: 20px;
  border-left: solid 1px #666666;
  background: url('../images/message.png') center no-repeat;
  vertical-align: middle;
}
.info .button {
  position: relative;
  height: 36px;
  line-height: 36px;
  display: inline-block;
  margin-left: 20px;
  padding: 0 12px;
  background: #333;
  border-radius: 100px;
  font-size: 12px;
  color: #fff;
  font-weight: 200;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;
}
.info .button:hover {
  background: #fc634d;
}
.info .button .icon {
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  cursor: pointer;
}
.info .button.help-wrap .icon {
  width: 17px;
  background: url('../images/help.png') no-repeat;
}
.info .button.setting-wrap .icon {
  width: 20px;
  background: url('../images/setting.png') no-repeat;
}
.info .button.setting-wrap {
  margin-left: 10px;
  margin-right: 20px;
}
.info .button .txt {
  /*vertical-align: middle;*/
}
.info .logout {
  margin: 0 0 0 20px;
  font-size: 12px;
  color: #f8f8f8;
  vertical-align: middle;
  cursor: pointer;
}

.header-menu {
  display: inline-block;
  margin-left: 30px;
  height: 46px;
  line-height: 46px;
  background-color: #56555b;
}
.header-menu .header-menu-item {
  float: left;
  display: block;
  width: 180px;
  height: 100%;
  text-align: center;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  border-right: solid 1px #666666;
}
.header-menu .header-menu-item a {
  width: 100%;
  height: 100%;
  color: #fff;
  display: block;
}
.header-menu .header-menu-item:last-child {
  border-right: none;
}
.header-menu .header-menu-item:hover,
.header-menu .header-menu-item.current {
  background-color: #ff6246;
  border-color: #ff6246;
}
</style>
