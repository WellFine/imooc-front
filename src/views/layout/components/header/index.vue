<template>
  <div class="w-full bg-white border-b border-zinc-200 px-2 py-1">
    <div class="flex items-center">
      <img class="h-4 cursor-pointer mr-2" src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" @click="goToHome" />
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
