/** @type {import('tailwindcss').Config} */
module.exports = {
  // 标记 tailwind 的应用范围
  content: [
    './index.html',
    './src/**/*.{vue,js}'  // 应用到 src 下任何一个目录中以 .vue 或 .js 结尾的文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
