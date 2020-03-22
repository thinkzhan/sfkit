<template>
    <div class="left-nav">
        <div class="wrap">
            <!-- <div class="left-nav-title" v-if="type==='index'">常用操作
            </div> -->
            <div v-if="item.subMenu!==false"
                :class="['left-nav-item', {current: item.current, index: type==='index'}]"
                 v-for="(item, index) in curNav"
                 :key="index"
                 >
                <router-link :to="item.pathFull">
                    <i v-if="type==='index'" class="icon" :style='{background: "url(" + item.icon + ") no-repeat"}'></i>
                    <span class="name">{{item.name}}</span>
                </router-link>
            </div>
            <div :class="['service', {index2: type==='index'}]">
                <p class="space-top">客服电话：{{$store.state.tel}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import Conf from '@/router/config';

exports.data = function() {
    return {
        leftNavList: Conf[0].children,
        type: '',
        userType: '',
        curNav: []
    };
};
exports.methods = {
    navSelect(to, from) {
        const { matched } = this.$route;
        this.type = matched[1].path.replace('/', '');

        if (matched.length >= 2) {
            this.selected(this.type, matched[matched.length - 1].path.replace('/', ''));
        }
    },
    selected(type, path) {
        this.curNav = this.leftNavList.find(nav => nav.path === type).children;

        this.leftNavList.map(nav => {
            if (nav.path === type) {
                this.curNav = nav.children;
                this.curNav && this.curNav.map((cn, index) => {
                    if (['', '/'].includes(cn.path)) {
                        cn.pathFull = `/${nav.path}${cn.path}`;
                    } else {
                        cn.pathFull = `/${nav.path}/${cn.path}`;
                    }
                    cn.current = `/${path}` === cn.pathFull;
                    // tab下才显示子菜单
                    // cn.subMenu = nav.tab !== false && cn.subMenu;
                    this.$set(this.curNav, index, cn);
                });
            }
        });
    }
};

exports.watch = {
    $route(to, from) {
        this.navSelect();
    }
};

exports.beforeMount = function() {
    this.navSelect();
};
</script>
<style scopeds>
.left-nav {
  float: left;
  position: relative;
  width: 210px;
  height: 100%;
  margin: 0 -211px 0 0;
  background-color: #efefef;
  border-right: solid 1px #dbdbdb;
  z-index: 1000;
}

.left-nav.index {
  background-color: #3b3a3f;
  overflow-y: auto;
  overflow-x: hidden;
}

.left-nav.index .wrap {
  min-height: 630px;
}

.left-nav-title {
  height: 65px;
  line-height: 65px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  border-bottom: solid 1px #444444;
  box-shadow: 0px 1px 1px #fff;
}

.left-nav-item {
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: solid 1px #dbdbdb;
  box-shadow: 0px 1px 1px #fff;
}

.left-nav-item.index {
  position: relative;
  height: 140px;
  background-color: #3b3a3f;
  border-bottom: solid 1px #444444;
  box-shadow: none;
  color: #fff;
}

.left-nav-item .name {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #333;
}

.left-nav-item.index .name {
  line-height: 200px;
  color: #fff;
  font-weight: 500;
}

.left-nav-item .icon {
  position: absolute;
  bottom: 65px;
  left: 85px;
  display: block;
  width: 40px;
  height: 42px;
  background-repeat: no-repeat;
}

.left-nav-item.current .name {
  width: 211px;
  background-color: #fff;
  color: #ff6246;
  font-weight: 500;
}

.left-nav-item.index.current .name,
.left-nav-item.index:hover .name {
  background-color: rgb(86, 85, 91);
  color: #fff;
  font-weight: 500;
}

.service {
  position: absolute;
  bottom: 141px;
  width: 210px;
  font-size: 12px;
  color: #999999;
  text-align: center;
}

.service.index {
  position: static;
  margin-top: 110px;
}

.service .code-img {
  margin: 11px 0px 6px 0px;
  padding: 4px;
  width: 83px;
  height: 83px;
  background-color: #fff;
}

.service .space-top {
  margin-top: 13px;
}
</style>
