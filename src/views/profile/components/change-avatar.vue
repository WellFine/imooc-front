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
  import { isMobileTerminal } from '@/utils/flexible'
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'

  const props = defineProps({
    // 可访问的文件链接
    blob: {
      type: String,
      required: true
    }
  })

  const emits = defineEmits(['close'])

  const close = () => {  // 移动端关闭按钮点击事件
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
      // URL.createObjectURL 将 blob 转化为浏览器能够浏览的图片地址
      console.log(URL.createObjectURL(blob))
    })
  }
</script>
