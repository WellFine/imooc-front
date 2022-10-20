import { watch } from 'vue'
import store from '@/store'
import { THEME_LIGHT, THEME_DARK } from '@/constants'

// 初始化主题
export default () => {
  // 主题发生改变或刚进入系统时，进行 html class 的配置
  watch(() => store.getters.themeType, val => {
    let themeClass = ''

    switch (val) {
      case THEME_LIGHT:
        themeClass = 'light'
        break
      case THEME_DARK:
        themeClass = 'dark'
        break
    }

    document.querySelector('html').className = themeClass
  }, {
    immediate: true
  })
}
