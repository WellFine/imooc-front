import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000  // 5s 过期
})

export default service
