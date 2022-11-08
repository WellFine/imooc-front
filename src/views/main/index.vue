<!-- 移动端首页和 PC 端 layout 页面的二级路由页面 -->
<template>
  <!--
    scrollbar-thin 窄滚动条
    scrollbar-thumb-rounded 设置圆角滚动条
    scrollbar-thumb-transparent 移动端下滚动条透明
    xl:scrollbar-thumb-zinc-200 设置 pc 端下滚动条颜色
    scrollbar-track-transparent 滚动条轨道透明
  -->
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
    <navigation-vue />
    <!-- max-w-screen-xl 指定最大宽度 1280px，xl:mt-4 在屏幕宽度大于 1280px 时生效 -->
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue />
    </div>
  </div>
</template>

<script setup>
  import navigationVue from './components/navigation/index.vue'
  import listVue from './components/list/index.vue'
</script>
