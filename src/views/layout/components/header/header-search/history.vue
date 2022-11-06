<template>
  <div>
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <m-svg-icon
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        name="delete" fillClass="fill-zinc-400"
        @click="onDeleteAllClick"
      />
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in $store.getters.historys" :key="item"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
        @click="onItemClick(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          name="input-delete" @click.stop="onDeleteClick(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { confirm } from '@/libs'

  const emits = defineEmits(['itemClick'])
  const store = useStore()

  const onDeleteAllClick = () => {  // 删除全部历史记录
    confirm('确定要删除所有历史记录吗？').then(() => {
      store.commit('search/deleteAllHistory')
    }).catch(() => {})
  }
  const onItemClick = item => {
    emits('itemClick', item)
  }
  const onDeleteClick = index => {
    store.commit('search/deleteHistory', index)
  }
</script>
