<template>
    <div class="layer" @click.stop="cancelAction">
        <div class="layer-box">
            <div class="header"><i @click.stop="cancelAction"></i></div>
            <div class="item">{{title}}</div>
            <div class="submit global-clearfix">
                <a v-if="!hideConfirm" href="javascript:;" class="submit-btn-ok" @click.stop="submitAction">{{confirm}}</a>
                <a v-if="!hideCancel" href="javascript:;" class="submit-btn-cancel" @click.stop="cancelAction">{{cancel}}</a>
            </div>
        </div>
    </div>
</template>
<style scoped>
.layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.5);
    z-index: 1000;
}

.layer-box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 338px;
    height: 195px;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background: #fff;
    border: 1px solid #D5D5D5;
    z-index: 100;
}

.layer-box .header {
    padding-left: 20px;
    height: 48px;
    line-height: 48px;
    color: #666;
    font-size: 16px;
}

.layer-box .header i {
    display: block;
    float: right;
    padding: 18px;
    width: 14px;
    height: 14px;
    cursor: pointer;
    background: url('images/guanbi.png') no-repeat center center;
}

.item {
    width: 200px;
    margin: 0 auto 18px;
    font-size: 18px;
    line-height: 1.5;
    color: #4A4A4A;
    text-align: center;
}

.submit {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 30px;
}

.submit-btn-ok,
.submit-btn-cancel {
    display: inline-block;
    padding: 12px 25px;
    font-size: 14px;
    color: #4A4A4A;
    background: #F6F6F6;
    border: 1px solid #D5D5D5;
    border-radius: 2px;
}

.submit-btn-ok {
    margin-right: 20px;
    background: #FF6246;
    color: #fff;
}
</style>
<script>
module.exports = {
    data() {
        return {
            title: '确认提交？',
            confirm: '确认',
            cancel: '取消',
            hideCancel: false,
            hideConfirm: false
        };
    },
    methods: {
        close() {
            this.closed = true;
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        cancelAction() { // 取消
            this.close();
            // this.$emit('cancel');
            if (typeof this.onCancel === 'function') {
                this.onCancel(this);
            }
        },
        submitAction() { // 提交
            this.close();
            this.$emit('submit');
            if (typeof this.onConfirm === 'function') {
                this.onConfirm(this);
            }
        }
    }
};
</script>
