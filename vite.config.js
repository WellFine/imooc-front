import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {  // 软链接
      '@': join(__dirname, '/src')
    }
  },
  server: {
    proxy: {  // 代理配置
      '/api': {  // 代理所有 /api 请求
        target: 'https://api.imooc-front.lgdsunday.club/',  // 代理后的请求地址
        changeOrigin: true  // 开启跨域
      }
    }
  }
})
