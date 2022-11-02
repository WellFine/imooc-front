import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { useREM } from '@/utils/flexible'
import useTheme from '@/utils/theme'
import mLibs from './libs'
import directives from './directives'
// 注册 svg-icons，导入的路径是固定的，这是 vite-plugin-svg-icons 生成的虚拟地址
import 'virtual:svg-icons-register'

useREM()
useTheme()

createApp(App).use(router).use(store).use(mLibs).use(directives).mount('#app')
