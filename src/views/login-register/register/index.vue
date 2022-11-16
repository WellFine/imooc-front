<template>
  <div class="relative h-screen bg-white xl:bg-zinc-200 dark:bg-zinc-800 text-center">
    <!-- 顶部图片 -->
    <header-vue />
    <!-- 表单 -->
    <div class="block xl:w-[388px] px-3 xl:py-4 mt-4 xl:m-auto xl:mt-8 dark:bg-zinc-800 xl:bg-white xl:dark:bg-zinc-900 xl:rounded-sm xl:shadow-lg">
      <h3 class="hidden xl:block mb-2 font-semibold text-base text-main dark:text-zinc-300">注册账号</h3>
      <vee-form @submit="onRegisterHandler">
        <!-- name 属性用于绑定错误提示消息，rules 是校验规则，值为函数 -->
        <vee-field
          class="w-full text-base dark:text-zinc-400 dark:bg-zinc-800 xl:dark:bg-zinc-900 border-b border-b-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 outline-0 pb-1 px-1"
          type="text" placeholder="请输入用户名" autocomplete="on"
          name="username" :rules="validateUsername"
          v-model="registerForm.username"
        />
        <!-- 用户名输入框的错误提示，name 属性表示和哪个 Field 绑定 -->
        <vee-error-message class="text-sm text-main block mt-0.5 ml-1 text-left" name="username" />
        <vee-field
          class="w-full text-base dark:text-zinc-400 dark:bg-zinc-800 xl:dark:bg-zinc-900 border-b border-b-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 outline-0 pb-1 px-1"
          type="password" placeholder="请输入密码" autocomplete="on"
          name="password" :rules="validatePassword"
          v-model="registerForm.password"
        />
        <vee-error-message class="text-sm text-main block mt-0.5 ml-1 text-left" name="password" />
        <!-- rules 属性中 :@ 写法是关联 name 为 password 的元素，这样校验时能够拿到关联元素的值 -->
        <vee-field
          class="w-full text-base dark:text-zinc-400 dark:bg-zinc-800 xl:dark:bg-zinc-900 border-b border-b-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 outline-0 pb-1 px-1"
          type="password" placeholder="请再次输入密码" autocomplete="on"
          name="confirmPassword" rules="validateConfirmPassword:@password"
          v-model="registerForm.confirmPassword"
        />
        <vee-error-message class="text-sm text-main block mt-0.5 ml-1 text-left" name="confirmPassword" />
        <!-- 跳转注册链接 -->
        <div class="pt-1 leading-[0px] text-right">
          <a
            class="inline-block text-sm text-right text-zinc-400 dark:text-zinc-600 hover:text-main dark:hover:text-zinc-400 duration-300 cursor-pointer"
            @click="goToLogin"
          >去登录</a>
        </div>
        <!-- 注册协议 -->
        <div class="text-center">
          <a
            class="text-zinc-400 dark:text-zinc-600 hover:text-main dark:hover:text-zinc-400 text-sm duration-300"
            href="https://m.imooc.com/newfaq?id=89" target="__black"
          >注册即同意《慕课网注册协议》</a>
        </div>
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnimation="false" :loading="loading"
        >注册</m-button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import headerVue from '../components/header.vue'
  import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage, defineRule } from 'vee-validate'
  import { validateUsername, validatePassword, validateConfirmPassword } from '../validate'
  import { LOGIN_TYPE_USERNAME } from '@/constants'
  import { message } from '@/libs'

  const store = useStore()
  const router = useRouter()

  // 定义确认密码的校验规则，因为确认密码需要关联到密码
  defineRule('validateConfirmPassword', validateConfirmPassword)
  
  const registerForm = ref({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const loading = ref(false)

  const goToLogin = () => {
    router.push('/login')
  }

  const onRegisterHandler = async () => {
    loading.value = true
    const payload = {
      username: registerForm.value.username,
      password: registerForm.value.password
    }
    try {
      // 注册
      await store.dispatch('user/register', payload)
      // 注册成功，触发登录
      await store.dispatch('user/login', {
        ...payload,
        loginType: LOGIN_TYPE_USERNAME
      })
      router.push('/')
    } catch (err) {
      message('error', err.message)
    } finally {
      loading.value = false
    }
  }
</script>
