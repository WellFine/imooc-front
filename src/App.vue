<template>
  <div class="w-screen h-screen fixed top-0 left-0">
    <!-- 一级路由出口 -->
    <!-- <router-view /> -->
    <!-- 依靠 routerType 告诉 transition-router-view 应该使用什么动画来进行路由跳转 -->
    <m-transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    />
  </div>
</template>

<script setup>
</script>
