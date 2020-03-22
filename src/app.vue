<template lang="pug">
    div#app
        <!-- admin-ui组件来自router/index.js注册focus-admin-ui -->
        admin-ui(:config="config")
            router-view
</template>
<script>
export default {
    computed: {
        config() {
            return this.$store.getters.config;
        }
    }
};
</script>
