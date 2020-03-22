<template>
    <div class="doc" v-loading.fullscreen.lock="fullscreenLoading">
        <index-header></index-header>
        <left-nav></left-nav>
        <div class="right" id="right" v-bind:style="{height: height + 'px',width: width + 'px'}">
            <router-view v-show="!loading" style="height: 100%;"></router-view>
            <div class="loading" v-show="loading">
            </div>
        </div>
    </div>
</template>
<script scoped>

function getWinHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function getWinWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
module.exports = {
    data() {
        return {
            height: getWinHeight() - 110,
            width: getWinWidth(),
            loading: false,
            fullscreenLoading: false
        };
    },
    components: {
        'index-header': require('./Header/index.vue'),
        'left-nav': require('./LeftNav/index.vue')
    },

    watch: {
        '$store.state.loading': function() {
            this.fullscreenLoading = this.$store.state.loading;
        }
    },
    beforeMount() {
        window.onresize = () => {
            this.height = getWinHeight() - 110;
            this.width = getWinWidth();
        };
    }
};
</script>
<style scoped>
.doc {
  background-color: #f5f5f5;
  min-width: 1258px;
  height: 100%;
}
.right {
  width: 100%;
  min-width: 1258px;
  display: inline-block;
  padding: 0 10px 0 221px;
  vertical-align: top;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: #fff;
}
.wapper {
  overflow: hidden;
}
.loading {
  width: 100%;
  height: 100%;
  background: url('./images/loading.gif') no-repeat center;
}
</style>

