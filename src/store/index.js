/**
 * 全局状态中心
 */
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,  // app 中的内容不需要缓存
    search
  },
  plugins: [
    createPersistedState({  // 使用这个 plugin 后会自动到 localStorage 中加载对应模块的缓存数据
      key: 'imooc-front',  // 指定保存到 localStorage 中的 key
      paths: ['category', 'theme', 'search']  // 需要保存的模块
    })
  ]
})

export default store
