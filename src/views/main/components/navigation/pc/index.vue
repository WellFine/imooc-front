<template>
  <div class="bg-white sticky top-0 left-0 w-full z-10">
    <ul class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto">
      <!-- 箭头图标 -->
      <div class="absolute right-1 bottom-2.5 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200">
        <m-svg-icon name="unfold" class="w-1 h-1" fillClass="fill-zinc-900" />
      </div>
      <!-- leading 是 line-height -->
      <li
        v-for="item in $store.getters.categorys" :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer rounded mr-0.5 mb-1 hover:bg-zinc-200"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>
