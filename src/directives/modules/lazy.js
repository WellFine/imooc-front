import { useIntersectionObserver } from '@vueuse/core'
import { randomRGB } from '@/utils/color'

// 图片懒加载指令：图片不可见时不加载，图片可见时才加载
export default {
  mounted (el) {
    const imgSrc = el.src
    el.src = ''  // 将 src 置为空，图片就不会加载
    el.style.backgroundColor = randomRGB()  // 指定占位随机颜色
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc  // 图片可见时加载图片
        el.onload = () => {  // 图片加载完成后重置背景颜色
          el.style.backgroundColor = ''
        }
        stop()  // 停止监听 img 是否可见
      }
    })
  }
}
