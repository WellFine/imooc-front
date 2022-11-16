<template>
  <m-popover class="guide-my flex items-center" placement="bottom_left">
    <template #reference>
      <div v-if="$store.getters.token" class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900">
        <!-- 头像 -->
        <img v-lazy class="w-3 h-3 rounded-sm" :src="$store.getters.userInfo.avatar" />
        <!-- 箭头 -->
        <m-svg-icon class="h-1 w-1 ml-0.5" name="down-arrow" fillClass="fill-zinc-900 dark:fill-zinc-300" />
        <!-- vip 图标 -->
        <m-svg-icon v-if="$store.getters.userInfo.vipLevel" class="h-1.5 w-1.5 absolute right-[16px] bottom-0" name="vip" />
      </div>
      <div v-else>
        <m-button icon="profile" iconColor="#fff" @click="goToLogin" />
      </div>
    </template>
    <!-- 气泡，用户未登录时鼠标移入不显示 -->
    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        v-for="item in menuArr" :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon class="w-1.5 h-1.5 mr-1" :name="item.icon" fillClass="fill-zinc-900 dark:fill-zinc-300" />
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{ item.title }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { confirm } from '@/libs'

  const menuArr = [
    { id: '0', title: '个人资料', icon: 'profile', path: '/profile' },
    { id: '1', title: '升级 VIP', icon: 'vip-profile', path: '/member' },
    { id: '2', title: '退出登录', icon: 'logout', path: '' }
  ]

  const store = useStore()
  const router = useRouter()

  const goToLogin = () => {
    router.push('/login')
  }

  const onItemClick = item => {
    if (item.id == 2) {  // 退出登录
      confirm('是否退出登录').then(() => {
        store.dispatch('user/logout')
      })
    }
  }
</script>
