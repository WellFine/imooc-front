<template>
  <div class="w-[340px] h-[270px] fixed top-[20%] left-[50%] translate-x-[-50%] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-2xl">
    <!-- 头部 -->
    <div class="h-5 flex items-center text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <m-svg-icon
        class="w-3 h-3 p-0.5 rounded-sm cursor-pointer duartion-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        name="refresh" fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="onReset"
      />
      <m-svg-icon
        class="w-3 h-3 ml-2 p-0.5 rounded-sm cursor-pointer duartion-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        name="close" fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="onClose"
      />
    </div>
    <!-- captcha 区域 -->
    <div id="captcha"></div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
  import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
  import { getCaptcha } from '@/api/sys'

  const emits = defineEmits(['success', 'close'])

  let captcha = null
  onMounted(() => {
    captcha = sliderCaptcha({  // 创建 captcha 实例
      id: 'captcha',  // 渲染位置
      async onSuccess (arr) {  // 用户拼图成功后的回调
        /**
         * 参数 arr 为滑块拖动轨迹，正常情况下 SliderCaptch 的成功回调并没有提供这个参数
         * 这个参数是课程作者改动了 SliderCaptch 源码，添加了该参数
         * 以便在成功回调中进行验证
         */
        const res = await getCaptcha({
          behavior: arr
        })
        if (res) emits('success')
      },
      // onFail () {},  // 用户拼图失败后的回调
      verify (arr, url) {
        /**
         * 默认的验证方法，arr 为滑块拖动轨迹，url 为服务端验证请求地址
         * 已经在成功回调中进行了验证操作，就不在这里验证了
         * 但 verify 必须传入，且必须返回一个布尔值
         */
        return true
      }
    })
  })

  const onReset = () => {
    captcha.reset()
  }
  const onClose = () => {
    emits('close')
  }
</script>
