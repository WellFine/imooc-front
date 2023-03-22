<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <!-- component 指定 key 值为 $route.fullPath 让同一个动态路由也可以来回跳转，如从这个详情页跳到另一个详情页 -->
      <keep-alive :include="virtualTaskStack">
        <component
          :is="Component"
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
          :key="$route.fullPath"
        />
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
  router.beforeEach(to => {
    // 路由跳转前确定动画类型
    transitionName.value = props.routerType

    if (props.routerType === ROUTER_TYPE_PUSH) {
      // 新页面入栈
      // to.name 的 name 是在路由中定义的，这个值保持和组件的 name 选项一致，用于 keep-alive 的 include 数组元素匹配
      virtualTaskStack.value.push(to.name)
    } else if (props.routerType === ROUTER_TYPE_BACK) {
      virtualTaskStack.value.pop()
    }

    // 进入首页清空栈
    if (to.name === props.mainComponentName) {
      clearTask()
    }
  })

  // 处理动画状态，使新页面能够正常展示动画
  const isAnimation = ref(false)
  const beforeEnter = () => {
    isAnimation.value = true
  }
  const afterLeave = () => {
    isAnimation.value = false
  }

  // 虚拟任务栈，其中一定存在根页面
  const virtualTaskStack = ref([props.mainComponentName])
  // 清空栈中首页外的组件
  const clearTask = () => {
    virtualTaskStack.value = [props.mainComponentName]
  }
</script>

<style lang="scss" scoped>
  // push 页面时：新页面的进入动画
  .push-enter-active {
    animation-name: push-in;
    animation-duration: 0.5s;
  }
  // push 页面时：老页面的退出动画
  .push-leave-active {
    animation-name: push-out;
    animation-duration: 0.5s;
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
    animation-duration: 0.5s;
  }
  // 后退页面时：后退的页面执行的动画
  .back-leave-active {
    animation-name: back-out;
    animation-duration: 0.5s;
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
