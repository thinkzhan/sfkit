<template lang="pug">
div.help
    div.help-header
        p.txt 若使用手册仍未解决您的问题，欢迎致电<span class="red">{{$store.state.tel}}</span>获取更详细的人工帮助。
    div.help-imgs
        <iframe v-for="m in manuals" :src="m.url" width="100%" :height="iframeHeight" style="border: none;">
            <p>This browser does not support PDFs. Please download the PDF to view it: <a :href="m.url">Download PDF</a></p>
        </iframe>
</template>
<script>
import pdf from 'vue-pdf';

export default {
    components: {
        pdf
    },
    data() {
        return {
            manuals: [
                {
                    "url": "",
                    "order": null
                }
            ],
            supportVuePdf: true
        };
    },
    async created() {
        const helpManual = await this.$serv.helpManual();
        this.manuals = helpManual;
    }
};
</script>
<style scoped lang="stylus">
    .help
        padding 0 20px
        .help-header
            position relative
            height 85px
            line-height 85px
            border-bottom solid 1px #d5d5d5
            box-sizing border-box
            .txt
                font-size 14px
                color #666
                &:before
                    display inline-block
                    margin-right 8px
                    margin-bottom -2px
                    width 16px
                    height 16px
                    content ""
                    background url('./images/tips.png') center no-repeat
                .red
                    margin 0px 4px
                    color #FF6246
            .btn-right
                position absolute
                right 0px
                top 23px
                width 140px
        .help-imgs
            margin-top 20px
            width 100%
</style>
