/**
 * 全局状态访问处理
 * getter 可以认为是 state 的计算属性
 */
export default {
  // state.category.categorys 表示 store 中 category 模块下的 categorys state
  categorys: state => state.category.categorys,
  themeType: state => state.theme.themeType,
  currentCategory: state => state.app.currentCategory,  // navigation 选中 item 项
  currentCategoryIndex: (state, getters) => {  // navigation 选中项 index
    return getters.categorys.findIndex(item => item.id === getters.currentCategory.id)
  },
  historys: state => state.search.historys,  // 搜索历史记录
  searchText: state => state.app.searchText,  // 搜索文本
  token: state => state.user.token,
  userInfo: state => state.user.userInfo
}
