<template>
  <div class="relative h-screen bg-white xl:bg-zinc-200 dark:bg-zinc-800 text-center">
    <!-- 顶部图片 -->
    <header-vue />
    <!-- 表单 -->
    <div class="block xl:w-[388px] px-3 xl:py-4 mt-4 xl:m-auto xl:mt-8 dark:bg-zinc-800 xl:bg-white xl:dark:bg-zinc-900 xl:rounded-sm xl:shadow-lg">
      <h3 class="hidden xl:block mb-2 font-semibold text-base text-main dark:text-zinc-300">账号登录</h3>
      <vee-form @submit="onLoginHandler">
        <!-- name 属性用于绑定错误提示消息，rules 是校验规则，值为函数 -->
        <vee-field
          class="w-full text-base dark:text-zinc-400 dark:bg-zinc-800 xl:dark:bg-zinc-900 border-b border-b-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 outline-0 pb-1 px-1"
          type="text" placeholder="请输入用户名" autocomplete="on"
          name="username" :rules="validateUsername"
        />
        <!-- 用户名输入框的错误提示，name 属性表示和哪个 Field 绑定 -->
        <vee-error-message class="text-sm text-main block mt-0.5 ml-1 text-left" name="username" />
        <vee-field
          class="w-full text-base dark:text-zinc-400 dark:bg-zinc-800 xl:dark:bg-zinc-900 border-b border-b-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 outline-0 pb-1 px-1"
          type="password" placeholder="请输入密码" autocomplete="on"
          name="password" :rules="validatePassword"
        />
        <vee-error-message class="text-sm text-main block mt-0.5 ml-1 text-left" name="password" />
        <!-- 跳转注册链接 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a class="inline-block pb-1 text-sm text-right text-zinc-400 dark:text-zinc-600 hover:text-main dark:hover:text-zinc-400 duration-300 cursor-pointer">去注册</a>
        </div>
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnimation="false"
        >登录</m-button>
      </vee-form>
      <!-- 第三方登录 -->
      <div class="flex justify-around items-center mt-4">
        <m-svg-icon class="w-4 cursor-pointer" name="qq" />
        <m-svg-icon class="w-4 cursor-pointer" name="wexin" />
      </div>
    </div>
    <slider-captcha-vue
      v-if="isSliderCaptchaVisable"
      @success="onCaptchaSuccess" @close="isSliderCaptchaVisable = false"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import headerVue from '../components/header.vue'
  import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate'
  import { validateUsername, validatePassword } from '../validate'
  import sliderCaptchaVue from './slider-captcha.vue'

  const isSliderCaptchaVisable = ref(false)

  // 点击按钮触发登录事件，只有表单校验通过才能触发
  const onLoginHandler = () => {
    isSliderCaptchaVisable.value = true
  }

  const onCaptchaSuccess = () => {  // 人类行为验证通过
    isSliderCaptchaVisable.value = false
    // TODO: 登录操作
  }
</script>
