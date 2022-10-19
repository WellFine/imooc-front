<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-2">所有分类</h2>
    <ul class="overflow-y-scroll">
      <!-- active: 用于激活状态，即触摸 item 项时背景会变灰 -->
      <li
        class="text-lg text-zinc-900 px-2 py-1.5 duration-100 active:bg-zinc-100"
        v-for="(item, index) in $store.getters.categorys" :key="item.id"
        @click="$emit('onItemClick', index)"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
  // vue3 中推荐所有 emit 事件都进行说明注册
  defineEmits(['onItemClick'])
</script>
