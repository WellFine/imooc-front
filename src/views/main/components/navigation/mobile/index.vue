<template>
  <div>我是移动端下的 navigation</div>
</template>

<script setup>
  import { getCategory } from '@/api/category'

  const getCategoryData = async () => {
    const res = await getCategory()
    console.log(res)
  }
  getCategoryData()
</script>
