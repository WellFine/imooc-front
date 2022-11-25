<template>
  <div class="overflow-auto flex flex-col items-center">
    <!-- 移动端上方关闭按钮 -->
    <m-svg-icon
      v-if="isMobileTerminal" name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto" fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    />
    <img :src="blob" ref="imageTarget" />
    <m-button class="mt-3 w-[80%] xl:w-1/2" :loading="loading" @click="onConfirmClick">确定</m-button>
  </div>
</template>

<script>
  // PC 端配置对象
  const pcOptions = {
    aspectRatio: 1  // 裁剪框纵横比 1:1
  }
  // 移动端配置对象
  const mobileOptions = {
    viewMode: 1,  // 将裁剪框限制在画布的大小
    dragMode: 'move',  // 移动画布，裁剪框不动
    aspectRatio: 1,  // 裁剪框纵横比 1:1
    cropBoxMovable: false,  // 裁剪框不可移动
    cropBoxResizable: false  // 裁剪框不能调整大小
  }
</script>
<script setup>
  import { ref, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { isMobileTerminal } from '@/utils/flexible'
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'
  import { getOSSClient } from '@/utils/sts'
  import { message } from '@/libs'
  import { putProfile } from '@/api/user'

  const props = defineProps({
    // 可访问的文件链接
    blob: {
      type: String,
      required: true
    }
  })

  const emits = defineEmits(['close'])

  const store = useStore()

  const close = () => {  // 关闭事件
    emits('close')
  }

  // 图片裁剪
  const imageTarget = ref(null)
  let cropper
  onMounted(() => {
    cropper = new Cropper(
      imageTarget.value,
      isMobileTerminal.value ? mobileOptions : pcOptions
    )
  })

  const loading = ref(false)
  const onConfirmClick = () => {  // 确定按钮点击事件
    loading.value = true
    // toBlob 拿到裁剪后的图片类文件对象
    cropper.getCroppedCanvas().toBlob(blob => {
      putObjectToOSS(blob)
    })
  }

  // 进行 OSS 上传
  let ossClient
  const putObjectToOSS = async file => {
    if (!ossClient) ossClient = await getOSSClient()
    try {
      const fileType = file.type.split('/').pop()
      const fileName = `${store.getters.userInfo.username}/${Date.now()}.${fileType}`
      // put 方法两个参数：存放路径(包含名称)，上传的文件
      const res = await ossClient.put(`images/${fileName}`, file)
      onChangeProfile(res.url)
    } catch (e) {
      message('error', e)
    }
  }

  // 上传新头像到服务器
  const onChangeProfile = async avatar => {
    try {
      // 本地更新数据
      store.commit('user/setUserInfo', {
        ...store.getters.userInfo,
        avatar
      })
      // 服务器更新数据
      await putProfile(store.getters.userInfo)
      message('success', '用户头像修改成功')
      loading.value = false
      close()
    } catch (e) {
      message('error', `用户头像修改失败，${e}`)
    }
  }
</script>
