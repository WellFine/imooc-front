export default {
  namespaced: true,  // 独立作用域
  state: () => ({
    historys: []
  }),
  mutations: {
    addHistory (state, history) {
      state.historys.unshift(history)
      state.historys = [...new Set(state.historys)]
    },
    deleteHistory (state, index) {
      state.historys.splice(index, 1)
    },
    deleteAllHistory (state) {
      state.historys = []
    }
  }
}
