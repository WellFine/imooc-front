<!-- 移动端首页和 PC 端 layout 页面的二级路由页面 -->
<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    ref="containerTarget"
  >
    <!--
      scrollbar-thin 窄滚动条
      scrollbar-thumb-rounded 设置圆角滚动条
      scrollbar-thumb-transparent 移动端下滚动条透明
      xl:scrollbar-thumb-zinc-200 设置 pc 端下滚动条颜色
      scrollbar-track-transparent 滚动条轨道透明
    -->
    <navigation-vue />
    <!-- max-w-screen-xl 指定最大宽度 1280px，xl:mt-1 在屏幕宽度大于 1280px 时生效 -->
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-1">
      <list-vue />
    </div>
    <!-- 移动端 tabbar -->
    <m-trigger-menu v-if="isMobileTerminal" class="fixed bottom-6 left-0 right-0 w-[220px] mx-auto">
      <m-trigger-menu-item icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200">首页</m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="$store.getters.token"
        icon="vip" iconClass="fill-zinc-400 dark:fill-zinc-500" textClass="text-zinc-400 dark:text-zinc-500"
      >VIP</m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile" iconClass="fill-zinc-400 dark:fill-zinc-500" textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ $store.getters.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<script>
  export default {
    name: 'home'  // 给组件添加 name 选项，用于 keep-alive 的 include 数组元素匹配进行缓存
  }
</script>
<script setup>
  import { ref, onActivated } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { useScroll } from '@vueuse/core'
  import { isMobileTerminal } from '@/utils/flexible'
  import navigationVue from './components/navigation/index.vue'
  import listVue from './components/list/index.vue'

  const router = useRouter()
  const store = useStore()
  const onMyClick = () => {
    // 设置路由跳转的动画类型
    store.commit('app/changeRouterType', 'push')
    router.push(store.getters.token ? '/profile' : '/login')
  }

  const containerTarget = ref(null)
  const { y: containerTargetScrollY } = useScroll(containerTarget)
  // keep-alive 缓存的组件再次可见时，会触发 onActivated 钩子
  onActivated(() => {
    if (!containerTarget.value) return
    containerTarget.value.scrollTop = containerTargetScrollY.value
  })
</script>

<style></style>
