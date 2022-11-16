import md5 from 'md5'
import { loginUser } from '@/api/sys'
import { getProfile } from '@/api/user'
import { message } from '@/libs'

/**
 * 用户模块
 * 登录、退出登录、获取用户信息、刷新 token 等操作都封装到 vuex 中
 * 这是开发中比较常见的封装方式
 */
export default {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {}
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
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
      context.dispatch('profile')  // 登录成功后获取用户信息
    },
    async profile (context) {  // 获取用户信息
      const data = await getProfile()
      context.commit('setUserInfo', data)
      message('success', `欢迎${data.vipLevel ? ('VIP-' + data.vipLevel + ';用户') : ''}${data.nickname}`, 6000)
    },
    logout (context) {  // 退出登录
      context.commit('setToken', '')  // 清空 token
      context.commit('setUserInfo', {})  // 清空用户信息
      location.reload()  // 刷新页面，重新加载页面权限
    }
  }
}
