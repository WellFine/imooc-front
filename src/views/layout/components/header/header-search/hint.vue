<template>
  <ul>
    <li
      v-for="item in hintData" :key="item"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
      v-html="highlightText(item)"
    ></li>
  </ul>
</template>

<script setup>
  import { ref, watch } from 'vue-demi'
  import { getHint } from '@/api/pexels'
  import { watchDebounced } from '@vueuse/core'

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

  // const debounce = (fn, delay) => {
  //   let timer = null
  //   return function () {
  //     if (timer) clearTimeout(timer)
  //     timer = setTimeout(function () {
  //       fn()
  //       timer = null
  //     }, delay)
  //   }
  // }

  // watch(() => props.searchText, debounce(getHintData, 500), {
  //   immediate: true
  // })

  watchDebounced(() => props.searchText, getHintData, {
    immediate: true,
    debounce: 500
  })

  const onItemClick = item => {
    emits('itemClick', item)
  }

  // 处理关键字高亮
  const highlightText = text => {
    const highlightTag = `<span class="text-zinc-900 dark:text-zinc-200">${ props.searchText }</span>`
    return text.replaceAll(props.searchText, highlightTag)
  }
</script>
