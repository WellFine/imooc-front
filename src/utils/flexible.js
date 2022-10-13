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
