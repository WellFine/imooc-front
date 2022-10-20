import { THEME_LIGHT } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    themeType: THEME_LIGHT  // 当前主题模式，默认极简白
  }),
  mutations: {
    changeThemeType (state, theme) {
      state.themeType = theme
    }
  }
}
