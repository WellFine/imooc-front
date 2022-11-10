<template>
  <div
    class="w-full h-5 flex items-center z-10 bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700"
    :class="[ sticky ? 'sticky top-0 left-0' : 'relative' ]"
  >
    <!-- 左 -->
    <div
      class="h-full w-5 absolute left-0 flex justify-center items-center"
      @click="onClickLeft"
    >
      <slot name="left">
        <!-- 不传插槽默认展示 back 图标 -->
        <m-svg-icon name="back" class="w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200" />
      </slot>
    </div>
    <!-- 中 -->
    <div class="h-full m-auto flex justify-center items-center font-bold text-base text-zinc-900 dark:text-zinc-200">
      <slot />
    </div>
    <!-- 右 -->
    <div
      class="h-full w-5 absolute right-0 flex justify-center items-center"
      @click="onClickRight"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
  import { useSlots } from 'vue'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    clickLeft: Function,  // 左边按钮点击事件
    clickRight: Function,  // 右边按钮点击事件
    sticky: Boolean  // 是否吸顶
  })

  const slots = useSlots() 
  const router = useRouter()
  const onClickLeft = () => {
    if (props.clickLeft) props.clickLeft()
    // 没传 left 插槽默认显示回退按钮，执行回退事件
    if (!slots.left) router.back()
  }
  const onClickRight = () => {
    if (props.clickRight) props.clickRight()
  }
</script>
