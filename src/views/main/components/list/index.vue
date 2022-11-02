<template>
  <div>
    <m-waterfall
      class="w-full px-1"
      :data="pexelsList" nodeKey="id"
      :column="isMobileTerminal ? 2 : 5" :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width" />
      </template>
    </m-waterfall>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { getPexelsList } from '@/api/pexels'
  import { isMobileTerminal } from '@/utils/flexible'
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
