<template>
  <div class="flex-grow">
    <m-search v-model="inputValue">
      <template #dropdown>
        <div>dropdown</div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const inputValue = ref('')
</script>
