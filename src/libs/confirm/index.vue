<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div v-if="isVisable" class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" @click="close"></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div v-if="isVisable" class="w-[80%] xl:w-[35%] fixed top-1/3 left-1/2 translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800">
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">{{ title }}</div>
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">{{ content }}</div>
        <div class="flex justify-end items-center">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{ cancelText }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{ confirmText }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  // 因为 confirm 组件是以方法调用来展示的，所以全局自动注册的组件会失效，需要手动引入
  import mButton from '@/libs/button/index.vue'

  const props = defineProps({
    title: String,
    content: {
      type: String,
      required: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelHandler: Function,
    confirmHandler: Function,
    close: Function
  })

  const isVisable = ref(false)
  const show = () => {
    isVisable.value = true
  }

  /**
   * render 函数渲染 confirm 组件是直接插入 body 中的
   * 为了防止 confirm 动画失效，在挂载时再将 isVisable 置为 true
   */
  onMounted(() => {
    show()
  })

  // 关闭动画执行时间，不直接写 500 是为了可以在 css 中通过 v-bind 使用
  const duration = '0.5s'
  const close = () => {
    isVisable.value = false
    setTimeout(() => {  // 等待退场动画执行完毕后，再触发 props.close()
      if (props.close) props.close()
    }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
  }

  const onCancelClick = () => {
    if (props.cancelHandler) props.cancelHandler()
    close()
  }
  const onConfirmClick = () => {
    if (props.confirmHandler) props.confirmHandler()
    close()
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active,
  .up-enter-active,
  .up-leave-active {
    transition: all v-bind(duration);
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .up-enter-from,
  .up-leave-to {
    transform: translate(-50%, 100px);
    opacity: 0;
  }
</style>
