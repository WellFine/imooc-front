import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from "@/api/category"

export default {
  namespaced: true,  // 开启独立作用域
  state: () => {
    return {
      categorys: []
    }
  },
  mutations: {
    setCategorys (state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  actions: {
    async useCategoryData (context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
