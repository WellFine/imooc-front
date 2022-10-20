<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10">
    <ul class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden" ref="ulTarget">
      <!-- 滑块，h-[22px] 表示 height: 22px;，这是在预设值不满足时的一种自定义写法 -->
      <li
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
        ref="sliderTarget" :style="sliderStyle"
      ></li>
      <!-- 汉堡按钮，shadow-l-white 和 shadow-l-zinc 是在 tailwind.config.cjs 中自定义的 -->
      <li class="fixed top-0 right-0 h-4 px-1 flex items-center bg-white dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-l-zinc" @click="onShowPopup">
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger" />
      </li>
      <!-- tailwind 提供 last: 来选中最后一个元素，这里为最后一个 li 添加 mr-3 -->
      <li
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-3"
        :class="{ 'text-zinc-100': index === currentCategoryIndex }"
        v-for="(item, index) in $store.getters.categorys" :key="item.id"
        :ref="setItemRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isVisable">
      <menu-vue @onItemClick="onItemClick" />
    </m-popup>
  </div>
</template>

<script setup>
  import { onBeforeUpdate, ref, watch } from 'vue'
  import { useScroll } from '@vueuse/core'
  import MenuVue from '@/views/main/components/menu/index.vue'

  // 滑块样式，改变样式进行滑动
  const sliderStyle = ref({
    transform: 'translateX(0px)',
    width: '52px'
  })

  // 选中 item 的下标
  const currentCategoryIndex = ref(0)
  // item 点击事件
  const onItemClick = index => {
    currentCategoryIndex.value = index  // 切换滑动
    isVisable.value = false  // 隐藏 popup 窗口
  }

  // 获取所有的 item 元素
  let itemRefs = []
  // vue3 中要想获取 v-for 下的多个 dom，需要用函数
  const setItemRef = el => {
    // 元素卸载时 el 为 null，所以判断是否为空
    if (el) itemRefs.push(el)
  }
  onBeforeUpdate(() => {
    /**
     * 单靠 setItemRef 获取所有 v-for 下的 item dom 元素会产生一个问题
     * 由于每次组件更新时，引起 dom 变化后，setItemRef 就会再次执行
     * 这会导致 itemRefs 越来越长，产生不需要的冗余数据
     * 所以需要在数据改变之后，dom 变化之前将 itemRefs 置空
     */
    itemRefs = []
  })

  // 获取 ul 元素
  const ulTarget = ref(null)
  // 通过 vueuse 提供的 useScroll 方法来获取响应式的 scroll 滚动距离
  const { x: ulScrollLeft } = useScroll(ulTarget)

  // item 改变，根据其 left 和 width 以及 ul 已滚动距离计算 sliderStyle 以及 ul 列表需要滚动的距离
  watch(currentCategoryIndex, val => {
    const { left, width } = itemRefs[val].getBoundingClientRect()
    // 移动的距离 = ul 横向滚动距离 + 当前 item 的 left - ul 的 padding-left
    const distance = ulScrollLeft.value + left - 10

    sliderStyle.value = {
      transform: `translateX(${distance}px)`,
      width: `${width}px`
    }

    ulTarget.value.scrollTo({
      left: distance
    })
  })

  // 控制 popup 展示
  const isVisable = ref(false)
  const onShowPopup = () => isVisable.value = true
</script>
