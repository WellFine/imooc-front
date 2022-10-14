import axios from 'axios'
import { getSecret } from '.'

const service = axios.create({
  baseURL: '/api',
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

export default service
