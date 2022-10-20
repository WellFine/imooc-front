import { watch } from 'vue'
import store from '@/store'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

let matchMedia
// 监听操作系统主题变更
const watchSystemThemeChange = () => {
  if (matchMedia) return  // 仅需一次初始化
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  // 监听操作系统主题变化
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

const changeTheme = theme => {
  let themeClass = ''

  switch (theme) {
    case THEME_LIGHT:
      themeClass = 'light'
      break
    case THEME_DARK:
      themeClass = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClass = matchMedia.matches ? 'dark' : 'light'
      break
  }

  document.querySelector('html').className = themeClass
}

// 初始化主题
export default () => {
  // 监听系统主题，发生改变或刚进入系统时，进行 html class 的配置
  watch(() => store.getters.themeType, changeTheme, {
    immediate: true
  })
}
