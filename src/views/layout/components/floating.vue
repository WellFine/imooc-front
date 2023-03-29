<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg" @click="onGuideClick">
      <m-svg-icon name="guide" class="w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main" />
    </div>
    <!-- 反馈 -->
    <m-popover class="guide-feedback" placement="left">
      <template #reference>
        <div class="w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg">
          <m-svg-icon name="feedback" class="w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main" />
        </div>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          @click="onToFeedback"
        >
          <m-svg-icon name="feedback" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300" />
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  // 1. 导入 driver.js 库和样式文件
  import Driver from 'driver.js'
  import 'driver.js/dist/driver.min.css'
  import steps from './steps'
  import { FEEDBACK_URL } from '@/constants'

  // 2. 初始化
  let driver = null
  onMounted(() => {
    driver = new Driver({
      allowClose: false,  // 点击蒙版不能关闭引导
      doneBtnText: '完成',  // 完成引导后按钮文本
      closeBtnText: '关闭',  // 关闭按钮文本
      nextBtnText: '下一步',  // 下一步按钮文本
      prevBtnText: '上一步'  // 上一步按钮文本
    })
  })

  const onGuideClick = () => {
    // 3. 开始引导
    driver.defineSteps(steps)  // 指定引导步骤
    driver.start()  // 开始引导
  }

  const onToFeedback = () => {
    window.open(FEEDBACK_URL, '__blank')
  }
</script>

<style lang="scss" scoped>
  .driver-fix-stacking {
    position: fixed;  // 该组件中引导元素外层是固定定位
    z-index: 100004 !important;
  }
</style>
