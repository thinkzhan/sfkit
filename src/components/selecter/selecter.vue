<template>
    <div :class="['selecter', {active: status}, {disabled: disabled}]" @click="toggle" :style="{width: width+'px'}">
        <span class="input">{{ curLabel || label }}</span>
        <ul class="select-options" v-if="!disabled">
            <li v-for="(item, index) of options"
                @click="changeSelect(item)"
                class="select-option">
                {{ item[labelKey] }}
            </li>
        </ul>
        <input type="hidden" v-model="curVal" >

    </div>
</template>
<style scoped src="./selecter.css">
</style>
<script src="./selecter.js">
</script>
