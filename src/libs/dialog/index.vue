<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        class="w-screen h-screen fixed top-0 left-0 bg-zinc-900/80 z-40"
        @click="close"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="xl:min-w-[35%] max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 bg-white dark:bg-zinc-800 cursor-pointer"
      >
        <div v-if="title" class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">{{ title }}</div>
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>
        <div class="flex justify-end">
          <m-button
            v-if="cancelHandler"
            class="mr-2" type="info"
            @click="onCancelClick"
          >{{ cancelText }}</m-button>
          <m-button
            v-if="confirmHandler"
            type="primary"
            @click="onConfirmClick"
          >{{ confirmText }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { useVModel } from '@vueuse/core'

  const props = defineProps({
    modelValue: {  // 显示开关
      type: Boolean,
      required: true
    },
    title: String,  // 标题
    cancelText: {  // 取消按钮文本
      type: String,
      default: '取消'
    },
    confirmText: {  // 确定按钮文本
      type: String,
      default: '确定'
    },
    cancelHandler: Function,  // 取消按钮点击事件
    confirmHandler: Function,  // 确定按钮点击事件
    close: Function  // 关闭回调
  })

  defineEmits(['update:modelValue'])

  const isVisible = useVModel(props)

  const close = () => {  // 关闭事件
    isVisible.value = false
    if (props.close) props.close()
  }

  const onCancelClick = () => {  // 取消按钮点击事件
    props.cancelHandler()
    close()
  }
  const onConfirmClick = () => {  // 确定按钮点击事件
    props.confirmHandler()
    close()
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active,
  .up-enter-active,
  .up-leave-active {
    transition: all 0.3s;
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
