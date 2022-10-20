<template>
  <!-- 父元素添加 group 类，子元素添加 group-hover: 前缀可以让鼠标悬停在父元素上时对子元素设置样式 -->
  <div class="group relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40" ref="containerTarget">
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] left-2" name="search" />
      <!-- 
        输入框，回车也触发搜索
        caret-zinc-400 设置光标颜色，tracking-wide 设置字母间距
        group-hover: 表示 div.group 进入 hover 状态时执行
       -->
      <input
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide text-sm font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 focus:border-red-300 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700"
        type="text" placeholder="搜索"
        v-model="inputValue" @keyup.enter="onSearchHandler"
        @focus="onFocusHandler" @blur="onBlurHandler"
      />
      <!-- 删除按钮，输入框有内容才展示 -->
      <m-svg-icon
        v-show="inputValue"
        class="w-1.5 h-1.5 absolute right-9 top-[50%] translate-y-[-50%] cursor-pointer duration-500" name="input-delete"
        @click="onClearClick"
      />
      <!-- 分割线 -->
      <div class="opacity-0 h-1.5 w-[1px] absolute right-[62px] top-[50%] translate-y-[-50%] duration-500 bg-zinc-200 group-hover:opacity-100"></div>
      <!-- 搜索按钮 -->
      <m-button
        class="opacity-0 absolute right-1 top-[50%] translate-y-[-50%] rounded-full duration-500 group-hover:opacity-100"
        icon="search" iconColor="#fff"
        @click="onSearchHandler"
      />
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <!-- 只有调用者用了 dropdown 插槽，并且 input 获得了焦点才展示 -->
      <div
        v-if="$slots.dropdown" v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute left-0 top-[56px] z-20 p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { onClickOutside, useVModel } from "@vueuse/core"

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    }
  })

  const emits = defineEmits([
    'update:modelValue',  // 双向绑定
    'search',  // 搜索
    'clear',  // 删除所有文本
    'input',  // 输入文本
    'focus',  // 获取焦点
    'blur'  // 失去焦点
  ])

  // inputValue 值改变会触发 update:modelValue
  const inputValue = useVModel(props)
  // 监听用户输入行为
  watch(inputValue, val => {
    emits('input', val)
  })

  // 删除文本
  const onClearClick = () => {
    inputValue.value = ''
    emits('clear')
  }

  // 搜索
  const onSearchHandler = () => {
    emits('search', inputValue.value)
  }

  // input 是否获取到焦点
  const isFocus = ref(false)
  // input 获取焦点事件
  const onFocusHandler = () => {
    isFocus.value = true
    emits('focus')
  }
  // input 失去焦点事件
  const onBlurHandler = () => {
    emits('blur')
  }

  // 最外层 div
  const containerTarget = ref(null)
  // 点击最外层 div 外的区域隐藏 dropdown
  onClickOutside(containerTarget, () => {
    isFocus.value = false
  })
</script>

<style lang="scss" scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(40px);
  }
</style>
