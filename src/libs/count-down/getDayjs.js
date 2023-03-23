import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'  // 导入语言包，dayjs 默认为英文
import duration from 'dayjs/plugin/duration'

// 处理中文国际化
dayjs.locale('zh')
// 插件，让 dayjs 可以直接使用数字作为时间长度
dayjs.extend(duration)

export default dayjs
