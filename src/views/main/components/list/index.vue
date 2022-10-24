<template>
  <div>
    <item-vue v-for="item in pexelsList" :key="item.id" :data="item" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { getPexelsList } from '@/api/pexels'
  import itemVue from './item.vue'

  const pexelsList = ref([])
  // 构建请求参数
  const query = {
    page: 1,
    size: 20
  }

  const getPexelsData = async () => {
    const { list } = await getPexelsList(query)
    pexelsList.value = list
  }
  getPexelsData()
</script>
