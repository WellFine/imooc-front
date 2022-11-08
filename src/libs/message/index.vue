<template>
  <transition name="down">
    <div
      v-show="isVisable"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon :name="styles[type].icon" :fillClass="styles[type].fillClass" class="w-1.5 h-1.5 mr-1.5" />
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
  const SUCCESS = 'success', WARN = 'warn', ERROR = 'error'
  const typeEnum = [SUCCESS, WARN, ERROR]
</script>
<script setup>
  import { onMounted, ref } from 'vue'
  // message 组件会用方法调用展示，自定义组件需要手动导入
  import mSvgIcon from '@/libs/svg-icon/index.vue'

  const props = defineProps({
    type: {
      type: String,
      required: true,
      validator: val => {
        const bool = typeEnum.includes(val)
        if (!bool) throw new Error(`message 组件的 type 值必须为 ${typeEnum.join('、')} 其中一个`)
        return bool
      }
    },
    content: {
      type: String,
      required: true
    },
    duration: Number,
    destory: Function  // message 关闭的回调，主要作用是在 message 消失时从 body 中删除
  })

  // 样式对象，其中色值是自定义的
  const styles = {
    warn: {
      icon: 'warn',
      fillClass: 'fill-warn-300',  // 图标填充颜色
      textClass: 'text-warn-300',  // 字体颜色
      containerClass: 'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'  // 容器颜色
    },
    error: {
      icon: 'error',
      fillClass: 'fill-error-300',
      textClass: 'text-error-300',
      containerClass: 'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
    },
    success: {
      icon: 'success',
      fillClass: 'fill-success-300',
      textClass: 'text-success-300',
      containerClass: 'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
    }
  }

  const isVisable = ref(false)
  const animateDuration = '0.5s'  // 动画执行时间

  onMounted(() => {
    /**
     * 方法调用展示 message 时，render 会直接插入组件
     * 为了保证动画执行，在挂载后才展示
     */
    isVisable.value = true
    setTimeout(() => {
      isVisable.value = false
      setTimeout(() => {  // 延迟到结束动画执行后，再执行 props.destory 销毁
        if (props.destory) props.destory()
      }, parseInt(animateDuration.replace('0.', '').replace('s', '') * 100))
    }, props.duration)
  })
</script>

<style lang="scss" scoped>
  .down-enter-active,
  .down-leave-active {
    transition: all v-bind(animateDuration);
  }
  .down-enter-from,
  .down-leave-to {
    opacity: 0;
    transform: translate(-50%, -100px);
  }
</style>
