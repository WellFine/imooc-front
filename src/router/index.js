/**
 * 路由处理中心
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import mobileRoutes from '@/router/modules/mobile-routes'
import pcRoutes from '@/router/modules/pc-routes'

// 创建 VueRouter 实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes
})

export default router
