/**
 * 移动端路由
 */
export default [{
  path: '/',
  name: 'home',
  component: () => import('@/views/main/index.vue')
}, {
  path: '/pins/:id',
  name: 'pins',
  component: () => import('@/views/pins/index.vue')
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login-register/login/index.vue')
}, {
  path: '/register',
  name: 'register',
  component: () => import('@/views/login-register/register/index.vue')
}, {
  path: '/profile',
  name: 'profile',
  component: () => import('@/views/profile/index.vue'),
  meta: {
    user: true  // 标记当前页面只有用户登录后才能进入
  }
}]
