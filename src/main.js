import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { useREM } from '@/utils/flexible'
import mLibs from './libs'
// 注册 svg-icons，导入的路径是固定的，这是 vite-plugin-svg-icons 生成的虚拟地址
import 'virtual:svg-icons-register'

useREM()

createApp(App).use(router).use(store).use(mLibs).mount('#app')
