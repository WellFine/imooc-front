<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="themeData.list.length">
      <!-- 大图 -->
      <div class="relative rounded w-[260px] cursor-pointer">
        <img v-lazy class="h-full w-full object-cover rounded" :src="themeData.big.photo" />
        <!-- backdrop-blur 是毛玻璃效果，鼠标移入有一个毛玻璃消失的动画 -->
        <p class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none"># {{ themeData.big.title }}</p>
      </div>
      <!-- 小图 -->
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in themeData.list" :key="item.id"
          class="relative h-[45%] w-[260px] text-white text-xs ml-1.5 mb-1.5 rounded"
        >
          <img v-lazy class="w-full h-full object-cover rounded" :src="item.photo" />
          <p class="w-full h-full absolute top-0 left-0 flex items-center px-1 rounded cursor-pointer backdrop-blur hover:backdrop-blur-none duration-300"># {{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { getThemes } from '@/api/pexels'

  const themeData = ref({
    big: {},  // 大图部分
    list: []  // 小图部分
  })
  const getThemeData = async () => {
    const { themes } = await getThemes()
    themeData.value = {
      big: themes[0],
      list: themes.splice(1, themes.length)
    }
  }
  getThemeData()
</script>
