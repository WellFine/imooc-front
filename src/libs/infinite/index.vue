<template>
  <div>
    <!-- 长列表内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多内容 -->
      <m-svg-icon v-show="loading" class="w-4 h-4 mx-auto animate-spin" name="infinite-load" color="red" />
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">{{ finishedText }}</p>
    </div>
  </div>
</template>

<script setup>
  import { nextTick, ref, watch } from 'vue'
  import { useVModel, useIntersectionObserver } from '@vueuse/core'

  const props = defineProps({
    modelValue: {  // 是否处于加载状态
      type: Boolean,
      required: true
    },
    isFinished: {  // 数据是否全部加载完成
      type: Boolean,
      default: false
    },
    finishedText: {  // 数据全部加载完成提示文字
      type: String,
      default: '加载完成，没有更多数据了'
    }
  })

  const emits = defineEmits(['update:modelValue', 'load'])
  
  // 加载状态
  const loading = useVModel(props)

  // 长列表底部的视图元素
  const loadingTarget = ref(null)
  // 底部视图元素是否可见
  const targetIsIntersecting = ref(false)
  useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
    targetIsIntersecting.value = isIntersecting
    emitLoad()
  })
  
  const emitLoad = () => {
    /**
     * 获取数据后会改变 loading 状态，这里先延迟一会让数据渲染先完成
     * 看首屏是否铺满改变 targetIsIntersecting 值
     * 防止获取数据后未铺满，而 targetIsIntersecting 值依旧为 true，而 loading 改为 false 后再次获取数据
     */
    setTimeout(() => {
      // 当长列表触底，同时 loading 为 false 且数据尚未全部加载完成时，处理加载更多的逻辑
      if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
        loading.value = true  // 修改加载状态
        emits('load')  // 触发加载行为
      }
    }, 100)
  }

  // 监听 loading 变化，解决数据加载完成后首屏未铺满问题
  watch(loading, emitLoad)
</script>
