import { h, render } from 'vue'
import confirmComponent from './index.vue'

/**
 * 展示 confirm 组件，只传递一个参数时，该参数将作为 content 内容展示
 */
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }

    const cancelHandler = () => {  // 点击取消按钮执行的回调
      reject(new Error('点击了取消按钮'))
    }
    const confirmHandler = () => {  // 点击确定按钮执行的回调
      resolve()
    }
    const close = () => {  // 关闭 confirm 的回调
      // 把渲染的 vnode 删除
      render(null, document.body)
    }

    // h 函数生成 confirm 组件的 vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })

    // 根据 vnode 生成真实 DOM 并挂载到 body 上
    render(vnode, document.body)
  })
}
