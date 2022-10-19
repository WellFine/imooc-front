<template>
  <!-- 鼠标移入弹出卡片，鼠标移出卡片消失，enter 和 leave 这两个事件都不冒泡 -->
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹层卡片的媒介 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white border rounded-md"
        ref="contentTarget" :style="contentStyle"
      >
        <!-- 匿名插槽：弹层卡片 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
  const PROP_TOP = 'top'
  const PROP_LEFT = 'left'
  const PROP_RIGHT = 'right'
  const PROP_BOTTOM = 'bottom'
  const PROP_TOP_LEFT = 'top_left'
  const PROP_TOP_RIGHT = 'top_right'
  const PROP_BOTTOM_LEFT = 'bottom_left'
  const PROP_BOTTOM_RIGHT = 'bottom_right'
  const placementEnum = [
    PROP_TOP,
    PROP_LEFT,
    PROP_RIGHT,
    PROP_BOTTOM,
    PROP_TOP_LEFT,
    PROP_TOP_RIGHT,
    PROP_BOTTOM_LEFT,
    PROP_BOTTOM_RIGHT
  ]
</script>
<script setup>
  import { nextTick, ref, watch } from 'vue'

  const props = defineProps({
    placement: {
      type: String,
      default: PROP_BOTTOM_LEFT,
      validator (val) {
        const result = placementEnum.includes(val)
        if (!result) throw new Error(`placement 属性值必须为下列中一个：${placementEnum.join('、')}`)
        return result
      }
    }
  })

  const isVisable = ref(false)
  // 鼠标移入事件
  const onMouseenter = () => {
    isVisable.value = true
  }
  // 鼠标移出事件
  const onMouseleave = () => {
    isVisable.value = false
  }

  // 具名插槽父级 div
  const referenceTarget = ref(null)
  // 匿名插槽父级 div
  const contentTarget = ref(null)
  // 弹层气泡卡片样式对象
  const contentStyle = ref({
    top: '0px',
    left: '0px'
  })

  // 获取元素的宽高尺寸
  const getElementSize = target => {
    return {
      width: target.offsetWidth,
      height: target.offsetHeight
    }
  }

  // 气泡展示时计算样式对象
  watch(isVisable, val => {
    if (!val) return
    /**
     * vue 在数据改变后，需要等一个 EventLoop 周期 DOM 才会渲染变化
     * 所以在 isVisable 改变后是无法直接拿到准确的 contentTarget 元素的
     * 要用 nextTick 等待 DOM 渲染完成后，在执行的回调中进行相关处理
     */
    nextTick(() => {
      let top = 0, left = 0
      const { width: referenceWidth, height: referenceHeight } = getElementSize(referenceTarget.value)
      const { width: contentWidth, height: contentHeight } = getElementSize(contentTarget.value)

      switch (props.placement) {
        // top、left、right、bottom 的计算式中出现的 5 用于让弹层和媒介有个间隙，好看一点
        case PROP_TOP:
          top = -(contentHeight + 5)
          left = -(contentWidth / 2) + (referenceWidth / 2)
          break
        case PROP_LEFT:
          top = -(contentHeight / 2) + (referenceHeight / 2)
          left = -(contentWidth + 5)
          break
        case PROP_RIGHT:
          top = -(contentHeight / 2) + (referenceHeight / 2)
          left = referenceWidth + 5
          break
        case PROP_BOTTOM:
          top = referenceHeight + 5
          left = -(contentWidth / 2) + (referenceWidth / 2)
          break
        case PROP_TOP_LEFT:
          left = -contentWidth
          break
        case PROP_TOP_RIGHT:
          left = referenceWidth
          break
        case PROP_BOTTOM_LEFT:
          top = referenceHeight
          left = -contentWidth
          break
        case PROP_BOTTOM_RIGHT:
          top = referenceHeight
          left = referenceWidth
          break
      }

      contentStyle.value = {
        top: top + 'px',
        left: left + 'px'
      }
    })
  })
</script>

<style lang="scss" scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(20px)
  }
</style>
