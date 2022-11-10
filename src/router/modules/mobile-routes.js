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
}]
