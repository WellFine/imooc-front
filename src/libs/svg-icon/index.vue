<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" :class="fillClass" />
  </svg>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    name: {  // 要显示的 svg
      type: String,
      required: true
    },
    color: String,  // svg 图标颜色
    fillClass: String  // tailwind 指定 svg 的类名
  })

  // 真实显示的 svg 图标，拼上 #icon- 用于 vite 处理
  const symbolId = computed(() => `#icon-${props.name}`)
</script>
