/**
 * 全局状态中心
 */
import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'

const store = createStore({
  getters,
  modules: {
    category
  }
})

export default store
