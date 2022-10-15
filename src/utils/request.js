import axios from 'axios'
import { getSecret } from '.'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000  // 5s 过期
})

// 请求拦截器
service.interceptors.request.use(config => {
  const headers = config.headers || {}
  config.headers = {
    ...headers,
    ...getSecret()  // 配置 icode 和 codetype
  }
  return config  // 设置后记得返回 config
})

/**
 * 响应拦截器
 * 服务端返回数据之后，数据在 Promise 结构被 .then 或 await 前执行
 */
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {  // success 为 true 表明业务请求成功
    return data
  }
  // TODO：业务请求错误
  return Promise.reject(new Error(message))
})

export default service
