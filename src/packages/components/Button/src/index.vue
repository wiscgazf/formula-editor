<script setup lang="ts">
import {ref, defineOptions} from 'vue'

defineOptions({
  name: 'ZfButton',
})

const num = ref<number>(0)
</script>

<template>
  <div class="red" @click="num++">这是按钮{{ num }}</div>
</template>

<style scoped lang="less">
.red {
  background-color: #f00;
}
</style>
