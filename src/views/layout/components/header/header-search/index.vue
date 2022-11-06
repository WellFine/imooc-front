<template>
  <div class="flex-grow">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue v-show="inputValue" :searchText="inputValue" @itemClick="onSearchHandler" />
          <!-- 搜索记录 -->
          <history-vue v-show="!inputValue" @itemClick="onSearchHandler" />
          <!-- 推荐主题 -->
          <theme-vue v-show="!inputValue" />
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import hintVue from './hint.vue'
  import historyVue from './history.vue'
  import themeVue from './theme.vue'

  const store = useStore()
  const inputValue = ref('')

  const onSearchHandler = val => {
    inputValue.value = val
    if (val) {
      store.commit('search/addHistory', val)
      store.commit('app/changeSearchText', val)
    }
  }
</script>
