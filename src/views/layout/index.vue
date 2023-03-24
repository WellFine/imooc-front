<template>
  <div class="h-screen">
    <header-vue v-if="!isMobileTerminal" class="h-header" />
    <div class="h-main">
      <main-vue />
    </div>
    <floating-vue v-if="!isMobileTerminal" />
  </div>
</template>

<script setup>
  import { isMobileTerminal } from '@/utils/flexible'
  import headerVue from './components/header/index.vue'
  import mainVue from './components/main.vue'
  import floatingVue from './components/floating.vue'
</script>
