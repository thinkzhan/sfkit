<template>
    <div>
        <div :class="['check-item', {checked: item.check}]" v-for="item in optionsNew" @click="selectItem(item[keyString])">
            {{item[valueString]}}
        </div>
    </div>
</template>
<style scoped src="./checkbox.css">
</style>
<script src="./checkbox.js">
</script>
