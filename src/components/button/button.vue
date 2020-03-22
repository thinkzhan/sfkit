<template>
    <button :class="btnStyle" @click="click" v-if="!tips">{{txt}}</button>
    <el-popover v-else placement="bottom" width="150" trigger="hover" :content="tips">
        <button slot="reference" :class="btnStyle" @click="click">{{txt}}</button>
    </el-popover>
</template>
<style scoped src="./button.css"></style>
<script scoped src="./button.js"></script>
