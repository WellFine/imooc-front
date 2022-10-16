import svgIcon from './svg-icon/index.vue'
import popup from './popup/index.vue'

export default {
  install (app) {
    app.component('m-svg-icon', svgIcon)
    app.component('m-popup', popup)
  }
}
