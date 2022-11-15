/**
 * PC 端路由
 */
export default [{
  path: '/',
  name: 'main',
  component: () => import('@/views/layout/index.vue'),
  children: [{
    path: '',
    name: 'home',
    component: () => import('@/views/main/index.vue')
  }]
}, {
  path: '/pins/:id',
  name: 'pins',
  component: () => import('@/views/pins/index.vue')
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login-register/login/index.vue')
}]
