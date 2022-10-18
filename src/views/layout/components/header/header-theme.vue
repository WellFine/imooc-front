<template>
  <m-popover>
    <!-- 具名插槽：触发弹层的媒介 -->
    <template #reference>
      <m-svg-icon
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
        name="theme-light" fillClass="fill-zinc-900"
      />
    </template>
    <!-- 匿名插槽：弹层卡片 -->
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in themeArr" :key="item.id"
      >
        <m-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900" />
        <span class="text-zinc-900 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
  // 主题类型往后很多地方用到，所以抽取到常量文件夹中
  import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

  const themeArr = [
    { id: '0', type: THEME_LIGHT, icon: 'theme-light', name: '极简白' },
    { id: '1', type: THEME_DARK, icon: 'theme-dark', name: '极夜黑' },
    { id: '2', type: THEME_SYSTEM, icon: 'theme-system', name: '跟随系统' }
  ]
</script>
