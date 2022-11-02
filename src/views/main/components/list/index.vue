<template>
  <div>
    <m-infinite v-model="loading" :isFinished="isFinished" @load="getPexelsData">
      <m-waterfall
        class="w-full px-1"
        :data="pexelsList" nodeKey="id"
        :column="isMobileTerminal ? 2 : 5" :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width" />
        </template>
      </m-waterfall>
    </m-infinite>
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
  // 是否加载数据
  const loading = ref(false)
  // 数据是否全部加载完成
  const isFinished = ref(false)

  const getPexelsData = async () => {
    if (isFinished.value) return

    // 第一次请求后，后续请求 page 自增
    if (pexelsList.value.length) query.page++

    const { list, total } = await getPexelsList(query)
    pexelsList.value.push(...list)

    // 判断数据是否全部加载完成
    if (pexelsList.value.length === total) isFinished.value = true

    // loading 变为 true 的逻辑在 infinite 组件中，长列表触底时触发
    loading.value = false
  }
</script>
