<template>
  <div class="overflow-auto flex flex-col items-center">
    <!-- 移动端上方关闭按钮 -->
    <m-svg-icon
      v-if="isMobileTerminal" name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto" fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    />
    <img :src="blob" ref="imageTarget" />
    <m-button class="mt-3 w-[80%] xl:w-1/2" @click="onConfirmClick">确定</m-button>
  </div>
</template>

<script setup>
  import { isMobileTerminal } from '@/utils/flexible'

  const props = defineProps({
    // 可访问的文件链接
    blob: {
      type: String,
      required: true
    }
  })

  const emits = defineEmits(['close'])

  const close = () => {  // 移动端关闭按钮点击事件
    emits('close')
  }

  const onConfirmClick = () => {}  // 确定按钮点击事件
</script>