<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
    >
      <!-- 箭头图标 -->
      <div class="absolute right-0 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900" @click="toggle">
        <m-svg-icon :name="isOpenCategory ? 'fold' : 'unfold'" class="w-1 h-1" fillClass="fill-zinc-900 dark:fill-zinc-300" />
      </div>
      <!-- leading 是 line-height -->
      <li
        v-for="(item, index) in $store.getters.categorys" :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer rounded mr-0.5 mb-1 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        :class="{ 'text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900': index === currentCategoryIndex }"
        @click="onItemClick(index)"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 是否打开所有分类数据
  const isOpenCategory = ref(false)
  const toggle = () => {
    isOpenCategory.value = !isOpenCategory.value
  }

  // 选中分类下标
  const currentCategoryIndex = ref(0)
  const onItemClick = index => {
    currentCategoryIndex.value = index
  }
</script>
