<template>
  <div
    class="flex-none flex flex-col items-center w-[100px] xl:w-[150px] mt-2 mr-2 py-3 xl:py-2 border-[1px] hover:bg-orange-50 hover:border-orange-300 rounded-md relative cursor-pointer"
    :class="[ select ? 'bg-orange-50 dark:bg-orange-50/10 border-orange-300' : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-500' ]"
    @click="onItemClick"
  >
    <!-- 标题 -->
    <p class="text-base text-yellow-800" :class="[ select ? 'dark:text-orange-300' : 'dark:text-zinc-300' ]">{{ data.title }}</p>
    <!-- 价格 -->
    <p class="text-[32px] tracking-tighter font-sans font-bold text-yellow-800" :class="[ select ? 'dark:text-orange-300' : 'dark:text-zinc-300' ]">
      <span class="text-base">￥</span>
      <span>{{ data.price }}</span>
    </p>
    <!-- 原价 -->
    <p class="text-xs text-yellow-500 line-through">￥{{ data.oldPrice }}</p>
    <div v-if="hot" class="absolute right-[-1px] top-[-12px] h-[22px] w-[48px] leading-[22px] text-xs text-center text-yellow-700 bg-gradient-to-r from-orange-300 to-orange-100 rounded-tr-[10px] rounded-bl-[10px]">热销</div>
  </div>
</template>

<script>
  const EMITS_CLICK = 'click'
</script>
<script setup>
  const props = defineProps({
    data: {
      type: Object,
      required: true
    },
    hot: Boolean,  // 是否热销
    select: {  // 是否为当前选中套餐
      type: Boolean,
      default: false
    }
  })

  const emits = defineEmits([EMITS_CLICK])

  const onItemClick = () => {
    emits(EMITS_CLICK, props.data)
  }
</script>
