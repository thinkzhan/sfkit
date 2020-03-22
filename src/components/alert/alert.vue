<template>
    <div class="alert">
        <span :class="['show-text', {'success-text': type == 'success',
            'fail-text': type == 'error'}]" >{{message}}</span>
    </div>
</template>
<style scoped>
.alert {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  padding: 0 20px;
  height: 60px;
  color: #fff;
  border: rgb(204, 204, 204) 1px solid;
  background-color: #fff;
  z-index: 3000;
}
.show-text {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  display: inline-block;
  text-indent: 31px;
  color: #999;
}
.success-text {
  background: url('./images/ok.png') no-repeat 0px center;
}
.fail-text {
  background: url('./images/fail.png') no-repeat 0px center;
}
</style>
<script>
module.exports = {
    name: 'ruzhu-alert',

    data() {
        return {
            type: 'success',
            message: '信息提交成功。',
            closed: false,
            duration: 2000,
            timer: null,
            onClose: null
        };
    },
    methods: {
        close() {
            this.closed = true;
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
            window.GLOBAL_ALERT_INSTANCE = null;
            if (typeof this.onClose === 'function') {
                this.onClose(this);
            }
        },

        startTimer() {
            const that = this;
            if (that.duration > 0) {
                that.timer = setTimeout(() => {
                    if (!that.closed) {
                        that.close();
                    }
                }, that.duration);
            }
        },
        clearTimer() {
            clearTimeout(this.timer);
        }
    // error(str) {
    //     console.log(str);
    // }
    },
    mounted() {
        this.startTimer();
    }
};
</script>
