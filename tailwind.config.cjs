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
      }
    },
  },
  plugins: [],
}
