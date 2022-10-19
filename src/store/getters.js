/**
 * 全局状态访问处理
 * getter 可以认为是 state 的计算属性
 */
export default {
  // state.category.categorys 表示 store 中 category 模块下的 categorys state
  categorys: state => state.category.categorys
}
