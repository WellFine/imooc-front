<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <!-- 汉堡按钮，shadow-l-white 是在 tailwind.config.cjs 中自定义的 -->
      <li class="fixed top-0 right-0 h-4 px-1 flex items-center bg-white z-20 shadow-l-white">
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger" />
      </li>
      <!-- tailwind 提供 last: 来选中最后一个元素，这里为最后一个 li 添加 mr-3 -->
      <li
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-3"
        v-for="item in data" :key="item.id"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  /**
   * defineProps 方法接收与 props 选项相同的值，以此获得 props 的完整类型推导支持
   * 该方法只能在 <script setup> 单文件组件中使用，可以直接使用无需导入
   */
  defineProps({
    data: {
      type: Array,
      required: true
    }
  })
</script>
