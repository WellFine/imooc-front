<template>
  <!-- 父元素添加 group 类，子元素添加 group-hover: 前缀可以让鼠标悬停在父元素上时对子元素设置样式 -->
  <div class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] left-2" name="search" />
      <!-- 
        输入框
        caret-zinc-400 设置光标颜色，tracking-wide 设置字母间距
        group-hover: 表示 div.group 进入 hover 状态时执行
       -->
      <input
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide text-sm font-semibold border border-zinc-100 duration-500 focus:border-red-300 group-hover:bg-white group-hover:border-zinc-200"
        type="text" placeholder="搜索"
      />
      <!-- 删除按钮 -->
      <m-svg-icon class="w-1.5 h-1.5 absolute right-9 top-[50%] translate-y-[-50%] cursor-pointer duration-500" name="input-delete" />
      <!-- 分割线 -->
      <div class="opacity-0 h-1.5 w-[1px] absolute right-[62px] top-[50%] translate-y-[-50%] duration-500 bg-zinc-200 group-hover:opacity-100"></div>
      <!-- 搜索按钮 -->
      <m-button class="opacity-0 absolute right-1 top-[50%] translate-y-[-50%] rounded-full duration-500 group-hover:opacity-100" icon="search" iconColor="#fff" />
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div class="max-h-[368px] w-full text-base overflow-auto bg-white absolute left-0 top-[56px] z-20 p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl">
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(40px);
  }
</style>
