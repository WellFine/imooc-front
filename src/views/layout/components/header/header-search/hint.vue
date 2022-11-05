<template>
  <ul>
    <li
      v-for="item in hintData" :key="item"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
    >{{ item }}</li>
  </ul>
</template>

<script setup>
  import { ref, watch } from 'vue-demi'
  import { getHint } from '@/api/pexels'

  const props = defineProps({
    searchText: {
      type: String,
      required: true
    }
  })

  const emits = defineEmits(['itemClick'])

  const hintData = ref([])
  const getHintData = async () => {
    if (!props.searchText) return
    const { result } = await getHint(props.searchText)
    hintData.value = result
  }

  watch(() => props.searchText, getHintData, {
    immediate: true
  })

  const onItemClick = item => {
    emits('itemClick', item)
  }
</script>
