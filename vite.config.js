import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹，process.cwd() 返回当前 node 进程的工作目录
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 symbolId 格式，icon- 用于匹配 svg-icon 组件中添加的 icon-，[name] 是 svg 图标名称
      symbolId: 'icon-[name]'
    })
  ],
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
