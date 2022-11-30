<template>
  <div>
    <m-infinite v-model="loading" :isFinished="isFinished" @load="getPexelsData">
      <m-waterfall
        class="w-full px-1"
        :data="pexelsList" nodeKey="id"
        :column="isMobileTerminal ? 2 : 5" :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width" @click="onToPins" />
        </template>
      </m-waterfall>
    </m-infinite>
    <!-- 
      详情内容展示，需要用 transition 包裹才能捕获动画状态
      :css="false" 让 transition 跳过 css 检测，只执行 js 钩子
      before-enter 动画开始前的回调
      enter 入场动画的回调
      leave 退场动画的回调
     -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisablePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { getPexelsList } from '@/api/pexels'
  import { isMobileTerminal } from '@/utils/flexible'
  import itemVue from './item.vue'
  import pinsVue from '@/views/pins/components/pins.vue'
  import { useEventListener } from '@vueuse/core'
  import gsap from 'gsap'

  const pexelsList = ref([])
  // 构建请求参数
  let query = {
    page: 1,
    size: 20
  }
  // 是否加载数据
  const loading = ref(false)
  // 数据是否全部加载完成
  const isFinished = ref(false)

  const getPexelsData = async () => {
    if (isFinished.value) return

    // 第一次请求后，后续请求 page 自增
    if (pexelsList.value.length) query.page++

    const { list, total } = await getPexelsList(query)
    pexelsList.value.push(...list)

    // 判断数据是否全部加载完成
    if (pexelsList.value.length === total) isFinished.value = true

    // loading 变为 true 的逻辑在 infinite 组件中，长列表触底时触发
    loading.value = false
  }

  // 修改请求参数，重置状态
  const resetQuery = newQuery => {
    query = { ...query, ...newQuery }
    isFinished.value = false  // 重置状态
    // 列表清空后瀑布流组件没有数据支撑，导致长列表组件触发触底操作，从而 emit 了 load 事件，调用 getPexelsData 请求数据
    pexelsList.value = []
  }

  const store = useStore()
  watch(() => store.getters.currentCategory, val => {
    resetQuery({
      page: 1,
      categoryId: val.id
    })
  })
  watch(() => store.getters.searchText, val => {
    resetQuery({
      page: 1,
      searchText: val
    })
  })

  const isVisablePins = ref(false)  // 控制 pins 展示
  const currentPins = ref({})  // 当前选中的 pins 属性

  const onToPins = item => {
    // 修改浏览器的 url，但不会加载 url
    history.pushState(null, null, `#/pins/${item.id}`)
    isVisablePins.value = true
    currentPins.value = item
  }

  // 监听浏览器后退按钮事件
  useEventListener(window, 'popstate', () => {
    // 改变浏览器 url 的同时，让 pinsVue 消失，transition 的 leave 回调执行
    isVisablePins.value = false
  })

  const beforeEnter = el => {
    gsap.set(el, {  // set 设置动画起始状态
      scale: 0,  // 缩放
      opacity: 0,
      transformOrigin: '0 0',  // pinsVue 的变形原点
      translateX: currentPins.value.location?.translateX,  // 起始位置为图片中心点
      translateY: currentPins.value.location?.translateY
    })
  }
  const enter = (el, done) => {
    gsap.to(el, {  // to 设置动画结束状态，由 gsap 自动补全动画
      duration: 0.3,  // 动画时长
      scale: 1,
      opacity: 1,
      translateX: 0,
      translateY: 0,
      onComplete: done  // onComplete 动画执行完成的回调，传入 enter 必须执行的 done 回调即可
    })
  }
  const leave = (el, done) => {
    gsap.to(el, {
      duration: 0.3,
      scale: 0,
      opacity: 0,
      translateX: currentPins.value.location?.translateX,
      translateY: currentPins.value.location?.translateY,
      onComplete: done  // leave 也必须执行 done
    })
  }
</script>
