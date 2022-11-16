import md5 from 'md5'
import { loginUser } from '@/api/sys'

/**
 * 用户模块
 * 登录、退出登录、获取用户信息、刷新 token 等操作都封装到 vuex 中
 * 这是开发中比较常见的封装方式
 */
export default {
  namespaced: true,
  state: () => ({
    token: ''
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
    async login (context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        // 微信或 qq 登录时 password 不存在
        password: password ? md5(password) : ''
      })
      context.commit('setToken', data.token)
    }
  }
}
