/** @type {import('tailwindcss').Config} */
module.exports = {
  // 标记 tailwind 的应用范围
  content: [
    './index.html',
    './src/**/*.{vue,js}'  // 应用到 src 下任何一个目录中以 .vue 或 .js 结尾的文件
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.25rem', '0.35rem'],  // text-xs 改为 { font-size: 0.25rem; line-height: 0.35rem; }
        sm: ['0.35rem', '0.45rem'],
        base: ['0.45rem', '0.55rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem']
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b'
      },
      height: {
        header: '72px',  // PC 端 header 区域固定高度为 72px
        main: 'calc(100vh - 72px)'  // 剩下的屏幕高度都由 main 占据
      },
      colors: {
        main: '#f44c58',  // 定义项目主色值
        'hover-main': '#f32836',  // hover 时主色
        // 以下为 message 组件的自定义色值
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff'
      }
    },
  },
  darkMode: 'class',  // 手动切换 dark 模式
  plugins: [],
}
