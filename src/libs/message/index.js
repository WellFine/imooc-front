import { h, render } from 'vue'
import messageComponent from './index.vue'

export const message = (type, content, duration = 2000) => {
  const destory = () => {  // 动画结束时的回调
    render(null, document.body)
  }

  // 生成 message 组件的 vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destory
  })

  render(vnode, document.body)  // 根据 vnode 渲染 dom
}
