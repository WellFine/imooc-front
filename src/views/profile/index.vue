<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto xl:pt-1">
    <div class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border xl:border-zinc-200 xl:dark:border-zinc-600 xl:px-4 xl:py-2">
      <!-- 移动端 navbar -->
      <m-navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">个人资料</m-navbar>
      <!-- PC 端标题 -->
      <div v-else class="text-center text-lg font-bold mb-4 dark:text-zinc-300">个人资料</div>
      <div class="h-full w-full xl:w-2/3 px-1 pb-4 text-sm xl:text-center">
        <!-- 头像部分 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span class="w-8 inline-block xl:block mb-2 font-black text-sm dark:text-zinc-300 xl:mx-auto">我的头像</span>
          <div
            class="group w-[80px] h-[80px] relative left-1/2 translate-x-[-50%] xl:cursor-pointer"
            @click="onAvatarClick"
          >
            <!-- 图片 -->
            <img class="rounded-full w-full h-full" :src="$store.getters.userInfo.avatar" />
            <!-- 鼠标移入 mask 层 -->
            <div class="hidden xl:group-hover:block w-full h-full rounded-full absolute top-0 left-0 bg-black/40 duration-300">
              <m-svg-icon name="change-header-image" class="w-2 h-2 mx-auto mt-2" />
              <div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5">点击更换头像</div>
            </div>
          </div>
          <!-- 选择头像文件的隐藏域 -->
          <input
            v-show="false" ref="inputFileTarget"
            type="file" accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs text-center xl:w-10">支持 jpg、png、jpeg、gif 格式大小 1M 以内的图片</p>
        </div>
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">用户名</span>
          <m-input
            class="w-full" type="text" max="20"
            v-model="userInfo.nickname"
          />
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">职位</span>
          <m-input class="w-full" type="text" v-model="userInfo.title" />
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">公司</span>
          <m-input class="w-full" type="text" v-model="userInfo.company" />
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人主页</span>
          <m-input class="w-full" type="text" v-model="userInfo.homePage" />
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人介绍</span>
          <m-input
            class="w-full" type="textarea" max="50"
            v-model="userInfo.introduction"
          />
        </div>
        <!-- 保存修改 -->
        <m-button
          class="w-full xl:w-[160px] mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading" @click="onChangeProfile"
        >保存修改</m-button>
        <!-- 移动端退出登录按钮 -->
        <m-button
          class="block xl:hidden w-full dark:text-zinc-300 dark:bg-zinc-800"
          @click="onLogoutClick"
        >退出登录</m-button>
      </div>
    </div>
    <!-- PC 端 dialog 展示 -->
    <m-dialog v-if="!isMobileTerminal" title="裁剪头像" v-model="isCutVisible">
      <change-avatar-vue :blob="currentBlob" @close="isCutVisible = false" />
    </m-dialog>
    <!-- 移动端 popup 展示 -->
    <m-popup v-else :class="{ 'h-screen': isCutVisible }" v-model="isCutVisible">
      <change-avatar-vue :blob="currentBlob" @close="isCutVisible = false" />
    </m-popup>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { isMobileTerminal } from '@/utils/flexible'
  import { confirm, message } from '@/libs'
  import { putProfile } from '@/api/user'
  import changeAvatarVue from './components/change-avatar.vue'

  const store = useStore()
  const router = useRouter()

  // 移动端 navbar 左侧点击事件
  const onNavbarLeftClick = () => {
    router.back()
  }

  // 头像文件隐藏域元素
  const inputFileTarget = ref(null)
  // 点击头像事件
  const onAvatarClick = () => {
    inputFileTarget.value.click()
  }

  const isCutVisible = ref(false)  // 裁剪图片展示
  const currentBlob = ref('')  // 选中图片的 blob 链接

  /**
   * 选中文件后的回调
   * 注意：当连续选择同一个文件时，该回调只会在最开始触发一次
   * 要解决这个问题，需要在每次选择的图片不再使用后，清空文件选择器 inputFileTarget 的值即可
   */
  const onSelectImgHandler = () => {
    const imgFile = inputFileTarget.value.files[0]  // 获取选中的文件
    const blob = URL.createObjectURL(imgFile)  // 生成 blob 类文件链接对象
    currentBlob.value = blob
    isCutVisible.value = true
  }
  watch(isCutVisible, val => {
    if (!val) {  // 裁剪图片弹框消失，证明图片不再使用
      inputFileTarget.value.value = null  // 清空文件选择器的值
    }
  })

  // 输入框数据
  const userInfo = ref(store.getters.userInfo)
  // 保存修改
  const loading = ref(false)
  const onChangeProfile = async () => {
    loading.value = true
    try {
      await putProfile(userInfo.value)
      store.commit('user/setUserInfo', userInfo.value)
      message('success', '用户信息修改成功')
    } catch (err) {
      message('error', err.message)
    } finally {
      loading.value = false
    }
  }

  // 移动端退出登录
  const onLogoutClick = () => {
    confirm('确定要退出登录吗？').then(() => {
      store.dispatch('user/logout')
    })
  }
</script>
