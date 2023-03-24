<template>
  <div v-if="!isCountDownFinish" class="flex justify-center items-center py-0.5 bg-orange-100 border-orange-300 border-t xl:border xl:rounded-sm">
    <m-svg-icon name="countdown" class="w-1.5 h-1.5 mr-1" fillClass="fill-red-600" />
    <p class="text-xs text-red-600 font-bold">
      限时特惠 | 距离优惠结束仅剩
      <m-count-down
        :time="60 * 60 * 1000" class="inline-block"
        @finish="isCountDownFinish = true"
      />
    </p>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const isCountDownFinish = ref(false)  // 倒计时是否结束
</script>
