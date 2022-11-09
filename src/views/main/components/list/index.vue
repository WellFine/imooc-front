<template>
  <div>
    <m-infinite v-model="loading" :isFinished="isFinished" @load="getPexelsData">
      <m-waterfall
        class="w-full px-1"
        :data="pexelsList" nodeKey="id"
        :column="isMobileTerminal ? 2 : 5" :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width" @click="onToPins" />
        </template>
      </m-waterfall>
    </m-infinite>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { getPexelsList } from '@/api/pexels'
  import { isMobileTerminal } from '@/utils/flexible'
  import itemVue from './item.vue'

  const pexelsList = ref([])
  // 构建请求参数
  let query = {
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

  // 修改请求参数，重置状态
  const resetQuery = newQuery => {
    query = { ...query, ...newQuery }
    isFinished.value = false  // 重置状态
    // 列表清空后瀑布流组件没有数据支撑，导致长列表组件触发触底操作，从而 emit 了 load 事件，调用 getPexelsData 请求数据
    pexelsList.value = []
  }

  const store = useStore()
  watch(() => store.getters.currentCategory, val => {
    resetQuery({
      page: 1,
      categoryId: val.id
    })
  })
  watch(() => store.getters.searchText, val => {
    resetQuery({
      page: 1,
      searchText: val
    })
  })

  const onToPins = item => {
    // 修改浏览器的 url，但不会加载 url
    history.pushState(null, null, `/pins/${item.id}`)
  }
</script>
