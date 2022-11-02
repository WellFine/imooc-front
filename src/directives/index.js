// 全局注册指令
export default {
  install (app) {
    const directives = import.meta.globEager('./modules/*.js')
    for (const [key, value] of Object.entries(directives)) {
      // key: './modules/lazy.js' => directiveName: lazy
      app.directive(key.split('/').pop().replace('.js', ''), value.default)
    }
  }
}
