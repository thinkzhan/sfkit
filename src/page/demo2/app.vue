<template lang="pug">
div {{ test }}
</template>
<script>
export default {
    data() {
        return {
            test: '支持Vue'
        };
    },
    async mounted() {
        const data = await this.$api.demoList();
        console.log(data);
        this.$toast(data.msg);
    }
};
</script>
<style lang="scss">
</style>
