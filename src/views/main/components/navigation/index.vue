<template>
  <mobile-navigation-vue v-if="isMobileTerminal" />
  <pc-navigation-vue v-else />
</template>

<script setup>
  import { isMobileTerminal } from '@/utils/flexible'
  import mobileNavigationVue from './mobile/index.vue'
  import pcNavigationVue from './pc/index.vue'
</script>
