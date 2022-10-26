<template>
  <div>
    <m-waterfall
      :data="pexelsList" nodeKey="id"
      :column="5" :picturePreReading="true"
    >
      <template v-slot="{ item }">
        <item-vue :data="item" />
      </template>
    </m-waterfall>
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
