import { createProxyMiddleware } from 'http-proxy-middleware'

export default (req, res) => {
  // 接口请求是以 /prod-api 开头的，不是请求的直接返回
  if (!req.url.startsWith('/prod-api')) return

  // 创建代理对象转发请求
  createProxyMiddleware({
    target: 'https://imooc-front.lgdsunday.club/',
    changeOrigin: true
  })(req, res)
}
