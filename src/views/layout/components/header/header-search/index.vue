<template>
  <div class="flex-grow">
    <m-search v-model="inputValue">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue v-show="inputValue" :searchText="inputValue" @itemClick="onSearchHandler" />
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import hintVue from './hint.vue';

  const inputValue = ref('')

  const onSearchHandler = val => {
    inputValue.value = val
  }
</script>
