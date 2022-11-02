import { useIntersectionObserver } from '@vueuse/core'

// 图片懒加载指令：图片不可见时不加载，图片可见时才加载
export default {
  mounted (el) {
    const imgSrc = el.src
    el.src = ''  // 将 src 置为空，图片就不会加载，这里也可以指定为占位图片
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc  // 图片可见时加载图片
        stop()  // 停止监听 img 是否可见
      }
    })
  }
}
