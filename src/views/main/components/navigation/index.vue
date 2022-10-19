<template>
  <mobile-navigation-vue v-if="isMobileTerminal" />
  <pc-navigation-vue v-else />
</template>

<script setup>
  import { useStore } from 'vuex'
  import { isMobileTerminal } from '@/utils/flexible'
  import mobileNavigationVue from './mobile/index.vue'
  import pcNavigationVue from './pc/index.vue'
  import { getCategory } from '@/api/category'
  import { ALL_CATEGORY_ITEM } from '@/constants'

  const store = useStore()
  // 触发的 action 是 category 模块下的 useCategoryData
  store.dispatch('category/useCategoryData')
</script>
