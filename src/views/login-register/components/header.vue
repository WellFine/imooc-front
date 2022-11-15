<template>
  <!-- PC 端头部图标  -->
  <div class="hidden xl:block pt-5 h-8">
    <img class="m-auto" src="https://res.lgdsunday.club/signlogo.png" />
  </div>
  <!-- 移动端头部图标 -->
  <div class="h-[111px] xl:hidden">
    <!-- 背景图，暗黑模式下不显示 -->
    <img class="dark:hidden" src="https://res.lgdsunday.club/login-bg.png" />
    <!-- 前景图 -->
    <img class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]" src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" />
  </div>
</template>
