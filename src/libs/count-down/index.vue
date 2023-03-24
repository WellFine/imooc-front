<template>
  <div>
    <slot :duration="duration" :timeStr="showTime">
      <p class="text-sm">{{ showTime }}</p>
    </slot>
  </div>
</template>

<script>
  const TIME_FINISH = 'finish'  // 倒计时结束
  const TIME_CHANGE = 'change'  // 时间改变
  const INTERVAL_COUNT = 1000  // 倒计时间隔
</script>
<script setup>
  import { ref, watch, computed, onUnmounted } from 'vue'
  import dayjs from './getDayjs'

  const props = defineProps({
    // 倒计时的时间戳
    time: {
      type: Number,
      required: true
    },
    // 遵循 dayjs 库的 format 格式
    format: {
      type: String,
      default: 'HH:mm:ss'
    }
  })

  const emits = defineEmits([TIME_FINISH, TIME_CHANGE])

  const duration = ref(0)

  let interval
  // 开始倒计时
  const start = () => {
    close()
    interval = setInterval(durationFn, INTERVAL_COUNT)
  }
  // 倒计时中
  const durationFn = () => {
    duration.value -= INTERVAL_COUNT
    emits(TIME_CHANGE)
    if (duration.value <= 0) {
      duration.value = 0
      emits(TIME_FINISH)
      close()
    }
  }
  // 结束倒计时
  const close = () => {
    if (interval) clearInterval(interval)
  }

  // time 变化就开始计时
  watch(() => props.time, val => {
    duration.value = val
    start()
  }, {
    immediate: true
  })

  // 组件销毁时，清理倒计时
  onUnmounted(() => {
    close()
  })

  // 使用 dayjs 将 duration 转为 format 格式的字符串
  const showTime = computed(() => dayjs.duration(duration.value).format(props.format))
</script>
