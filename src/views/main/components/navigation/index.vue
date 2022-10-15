<template>
  <mobile-navigation-vue v-if="isMobileTerminal" :data="categoryData" />
  <pc-navigation-vue v-else />
</template>

<script setup>
  import { ref } from 'vue'
  import { isMobileTerminal } from '@/utils/flexible'
  import mobileNavigationVue from './mobile/index.vue'
  import pcNavigationVue from './pc/index.vue'
  import { getCategory } from '@/api/category'

  const categoryData = ref([])

  const getCategoryData = async () => {
    const { categorys } = await getCategory()
    categoryData.value = categorys
  }
  getCategoryData()
</script>
