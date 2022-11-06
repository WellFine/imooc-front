import { ALL_CATEGORY_ITEM } from '@/constants'

// app 模块中的数据不会被缓存
export default {
  namespaced: true,  // 独立作用域
  state: () => ({
    currentCategory: ALL_CATEGORY_ITEM,  // navigation 当前选中的 item 项
    searchText: ''  // 搜索的文本
  }),
  mutations: {
    changeCurrentCategory: (state, category) => {
      state.currentCategory = category
    },
    changeSearchText (state, text) {
      state.searchText = text
    }
  }
}
