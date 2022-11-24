<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      class="w-full py-0.5 px-1 outline-0 border border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 text-sm dark:text-zinc-400 rounded-sm duration-100 focus:border-blue-400"
      v-if="type === TYPE_TEXT" v-model="text"
      type="text" :maxlength="max"
    />
    <!-- 多行 -->
    <textarea
      class="w-full py-0.5 px-1 outline-0 border border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 text-sm dark:text-zinc-400 rounded-sm duration-100 focus:border-blue-400"
      v-if="type === TYPE_TEXTAREA" v-model="text"
      rows="5" :maxlength="max"
    />
    <!-- 字符限制 -->
    <span v-if="max" class="absolute right-1 bottom-0.5 text-zinc-400 text-xs" :class="{ 'text-main': textLength === parseInt(max) }">{{ textLength}} / {{ max }}</span>
  </div>
</template>

<script>
  const TYPE_TEXT = 'text'
  const TYPE_TEXTAREA = 'textarea'
</script>
<script setup>
  import { computed } from 'vue'
  import { useVModel } from '@vueuse/core'

  const props = defineProps({
    modelValue: {  // v-model
      type: String,
      required: true
    },
    type: {  // 输入类型
      type: String,
      default: TYPE_TEXT,
      validator (val) {
        const enumArr = [TYPE_TEXT, TYPE_TEXTAREA]
        const bool = enumArr.includes(val)
        if (!bool) throw new Error(`type 属性值必须为 ${enumArr.join('、')} 其中一个`)
        return bool
      }
    },
    max: [String, Number]  // 最大文本数
  })

  defineEmits(['update:modelValue'])

  const text = useVModel(props)  // 输入的字符 v-model

  const textLength = computed(() => text.value.length)
</script>
