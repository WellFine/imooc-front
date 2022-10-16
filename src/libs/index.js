import { defineAsyncComponent } from 'vue'

export default {
  install (app) {
    // 获取所有通用组件的 index.vue，import.meta.glob 是 vite 提供的
    const components = import.meta.glob('./*/index.vue')
    for (const [fullPath, fn] of Object.entries(components)) {
      // fullPath 都是 './组件名/index.vue' 形式，所以在新建通用组件时，文件夹名称就是组件名
      const componentName = `m-${fullPath.split('/')[1]}`
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
