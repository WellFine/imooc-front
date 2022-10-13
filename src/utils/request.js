import axios from 'axios'

const service = axios.create({
  baseURL: 'https://api.imooc-front.lgdsunday.club/api',
  timeout: 5000  // 5s 过期
})

// 请求拦截器
service.interceptors.request.use(config => {
  config.headers.icode = '95c7fc48fcee48faea09749eea0d64f2'  // icode 每隔一个月就会过期
  return config  // 设置后记得返回 config
})

export default service
