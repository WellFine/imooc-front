<template>
  <div class="fixed top-0 left-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto xl:p-2">
    <!-- 移动端下显示 navbar -->
    <m-navbar v-if="isMobileTerminal" sticky>
      {{ pexelsData.title }}
      <template #right>
        <m-svg-icon name="share" class="w-3 h-3" fillClass="fill-zinc-900 dark:fill-zinc-200" />
      </template>
    </m-navbar>
    <!-- PC 端不显示 navbar，显示关闭按钮 -->
    <m-svg-icon
      v-else name="close" fillClass="fill-zinc-400"
      class="w-3 h-3 absolute top-2 right-2 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100"
      @click="onPop"
    />
    <!-- 内容详情，pexelsData 有值时渲染 -->
    <div v-if="pexelsData.title" class="xl:w-[80%] xl:h-full xl:m-auto xl:rounded-lg xl:flex">
      <img class="w-screen xl:w-3/5 xl:h-full mb-2 xl:rounded-tl-lg xl:rounded-bl-lg xl:object-contain xl:bg-white xl:dark:bg-zinc-900 xl:border-r xl:border-zinc-200 xl:dark:border-zinc-700" :src="pexelsData.photo" />
      <div class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3">
        <!-- PC 端下分享与收藏 -->
        <div v-if="!isMobileTerminal" class="flex justify-between items-center mb-2">
          <m-svg-icon
            class="w-4 h-4 p-1 cursor-pointer rounded duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            name="share" fillClass="fill-zinc-900 dark:fill-zinc-200"
          />
          <m-button type="info" icon="heart" iconClass="fill-zinc-900 dark:fill-zinc-200" />
        </div>
        <!-- 标题 -->
        <p class="text-base xl:text-xl text-center text-zinc-900 dark:text-zinc-200 font-bold ml-1 xl:mb-5">{{ pexelsData.title }}</p>
        <!-- 作者 -->
        <div class="flex justify-center items-center mt-3 px-1 text-center">
          <img class="w-5 h-5 xl:w-5 xl:h-5 rounded-full" :src="pexelsData.avatar" />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{ pexelsData.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getPexelsFromId } from '@/api/pexels'
  import { isMobileTerminal } from '@/utils/flexible'

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })

  const pexelsData = ref({})
  const getPexelsData = async () => {
    pexelsData.value = await getPexelsFromId(props.id)
  }
  getPexelsData()

  const router = useRouter()
  const onPop = () => {  // PC 端关闭按钮点击事件
    router.back()
  }
</script>
