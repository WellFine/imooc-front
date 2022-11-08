<template>
  <div class="w-full bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 px-2 py-1 duration-500">
    <div class="flex items-center">
      <img v-lazy class="guide-home h-4 cursor-pointer mr-2" src="https://blog.xqtcat.cn/images/logo.jpg" @click="goToHome" />
      <header-search-vue />
      <header-theme-vue class="mx-1" />
      <header-my-vue />
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import headerSearchVue from './header-search/index.vue'
  import headerThemeVue from './header-theme.vue'
  import headerMyVue from './header-my.vue'

  const router = useRouter()
  const goToHome = () => {
    router.push('/')
  }
</script>
