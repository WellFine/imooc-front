<template>
  <!-- 鼠标移入弹出卡片，鼠标移出卡片消失，enter 和 leave 这两个事件都不冒泡 -->
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div>
      <!-- 具名插槽：触发弹层卡片的媒介 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示 -->
    <transition name="slide">
      <div v-show="isVisable" class="absolute p-1 z-20 bg-white border rounded-md">
        <!-- 匿名插槽：弹层卡片 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const isVisable = ref(false)
  // 鼠标移入事件
  const onMouseenter = () => {
    isVisable.value = true
  }
  // 鼠标移出事件
  const onMouseleave = () => {
    isVisable.value = false
  }
</script>

<style lang="scss" scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(20px)
  }
</style>
