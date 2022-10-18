/**
 * PC 端路由
 */
export default [{
  path: '/',
  name: 'main',
  component: () => import('@/views/layout/index.vue'),
  children: []
}]
