import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '../constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

/**
 * 判断当前是否为移动端设备，根据当前屏幕宽度是否小于一个指定宽度（1280）来判断
 * 使用计算属性使其具有响应式，更加灵活
 * 不用正则表达式结合 navigator.userAgent 来判断是因为要进行响应式的视图处理
 */
export const isMobileTerminal = computed(() => width.value < PC_DEVICE_WIDTH)
// export const isMobileTerminal = computed(() => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

/**
 * 动态指定 rem 基准值 font-size 为屏幕宽度的十分之一，最大值为 40px
 */
export const useREM = () => {
  const MAX_FONT_SIZE = 40  // 最大的 font-size
  document.addEventListener('DOMContentLoaded', () => {  // 监听 html 文档解析完成事件
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10  // 设置为屏幕宽度的十分之一
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize  // 最大 40
    html.style.fontSize = fontSize + 'px'
  })
}
