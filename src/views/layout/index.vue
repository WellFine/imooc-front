<template>
  <div class="h-screen">
    <header-vue class="h-header" />
    <main-vue class="h-main" />
    <floating-vue />
  </div>
</template>

<script setup>
  import headerVue from './components/header/index.vue'
  import mainVue from './components/main.vue'
  import floatingVue from './components/floating.vue'
</script>
