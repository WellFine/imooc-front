/**
 * 页面权限控制中心，如未登录不能进入个人中心页面
 */
import store from '@/store'
import router from '@/router'
import { message } from '@/libs'

// 路由全局前置守卫
router.beforeEach((to, from) => {
  if (!to.meta.user) return true  // 无需登录的页面直接放行
  if (store.getters.token) return true  // 需要登录且已登录的也放行
  message('warn', '登录失效，请重新登录')
  return '/'  // 需要登录但没登录的返回首页
})
