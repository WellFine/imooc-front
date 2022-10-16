<template>
  <!-- 如果直接在最外层 div 这里判断 modelValue 控制显示与隐藏，那么蒙版和内容的 transition 动画效果就会失效 -->
  <div>
    <!-- teleport 可以指定包裹的元素渲染到哪里 -->
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <!-- 
          在这里判断 modelValue 控制显示与隐藏才可以激活 transition 动画效果
          bg-zinc-900/80 这里除以 80 代表透明度为 0.8
         -->
        <div
          v-if="isVisable"
          class="w-screen h-screen z-40 bg-zinc-900/80 fixed top-0 left-0"
          @click="isVisable = false"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up">
        <!-- 使用 popup 组件时，没有在 props 中定义的属性都会透传到内容区域 div 上 -->
        <div
          v-if="isVisable" v-bind="$attrs"
          class="w-screen bg-white z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
  import { watch } from 'vue'
  import { useScrollLock, useVModel } from '@vueuse/core'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  })

  defineEmits(['update:modelValue'])

  // isVisable 是一个响应式数据，当 isVisable 值发生变化时，会自动触发 update:modelValue 的 emit 修改 modelValue
  const isVisable = useVModel(props)

  // 锁定滚动，通过 isLocked 响应式的锁定和解锁
  const isLocked = useScrollLock(document.body)
  watch(isVisable, val => {
    isLocked.value = val  // 组件展示时锁定滚动，组件隐藏时解锁滚动
  }, {
    immediate: true  // 最开始时就希望 watch 被激活
  })
</script>

<style lang="scss" scoped>
  // 进入时和离开时，设定过渡
  .fade-enter-active,
  .fade-leave-active,
  .popup-down-up-enter-active,
  .popup-down-up-leave-active {
    transition: all 0.3s;
  }
  // 蒙版动画，准备进入，离开完成
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  // 内容动画
  .popup-down-up-enter-from,
  .popup-down-up-leave-to {
    transform: translateY(100%);
  }
</style>
