<!-- 移动端首页和 PC 端 layout 页面的二级路由页面 -->
<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
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
