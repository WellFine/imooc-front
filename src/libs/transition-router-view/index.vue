<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
  const NONE = 'none'  // 不展示动画
  const ROUTER_TYPE_PUSH = 'push'  // 进入动画
  const ROUTER_TYPE_BACK = 'back'  // 退出动画
  const ROUTER_TYPE_ENUM = [ NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK ]
</script>
<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    // 路由跳转动画类型，进入还是退出
    routerType: {
      type: String,
      default: NONE,  // 默认没有跳转动画，因为 PC 端不展示
      validator (value) {
        const bool = ROUTER_TYPE_ENUM.includes(value)
        if (!bool) throw new Error(`routerType 属性必须是 ${ROUTER_TYPE_ENUM.join('、')} 中的一个`)
        return bool
      }
    },
    // 首页的组件名称，首页将永远位于虚拟任务栈的栈底，且不能有 back 行为
    mainComponentName: {
      type: String,
      required: true
    }
  })

  const transitionName = ref('')
  const router = useRouter()
  router.beforeEach(() => {
    // 路由跳转前确定动画类型
    transitionName.value = props.routerType
  })
</script>

<style lang="scss" scoped>
  // push 页面时：新页面的进入动画
  .push-enter-active {
    animation-name: push-in;
    animation-duration: 0.4s;
  }
  // push 页面时：老页面的退出动画
  .push-leave-active {
    animation-name: push-out;
    animation-duration: 0.4s;
  }
  // push 页面时：新页面的进入动画
  @keyframes push-in {
    0% {
      transform: translate(100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  // push 页面时：老页面的退出动画
  @keyframes push-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-50%, 0);
    }
  }

  // 后退页面时：即将展示的页面动画
  .back-enter-active {
    animation-name: back-in;
    animation-duration: 0.4s;
  }
  // 后退页面时：后退的页面执行的动画
  .back-leave-active {
    animation-name: back-out;
    animation-duration: 0.4s;
  }
  // 后退页面时：即将展示的页面动画
  @keyframes back-in {
    0% {
      width: 100%;
      transform: translate(-100%, 0);
    }
    100% {
      width: 100%;
      transform: translate(0, 0);
    }
  }
  // 后退页面时：后退的页面执行的动画
  @keyframes back-out {
    0% {
      width: 100%;
      transform: translate(0, 0);
    }
    100% {
      width: 100%;
      transform: translate(50%, 0);
    }
  }
</style>
