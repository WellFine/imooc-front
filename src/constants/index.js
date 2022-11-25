// PC 设备指定宽度，根据这个宽度来判断设备是移动端还是 PC 端
export const PC_DEVICE_WIDTH = 1280

// category 的本地构建数据，用于补全展示效果
export const ALL_CATEGORY_ITEM = {
  id: 'all',
  name: '全部'
}

// category 的初始化数据
export const CATEGORY_NOMAR_DATA = [
  ALL_CATEGORY_ITEM,
  { "id": "web_app_icon", "name": "UI/UX", "col": 1, "urlname": "web_app_icon" },
  { "id": "design", "name": "平面", "col": 1, "urlname": "design" },
  { "id": "illustration", "name": "插画/漫画", "col": 1, "urlname": "illustration" },
  { "id": "photography", "name": "摄影", "col": 2, "urlname": "photography" },
  { "id": "games", "name": "游戏", "urlname": "games" },
  { "id": "anime", "name": "动漫", "urlname": "anime" },
  { "id": "industrial_design", "name": "工业设计", "col": 2, "urlname": "industrial_design" },
  { "id": "architecture", "name": "建筑设计", "urlname": "architecture" },
  { "id": "art", "name": "人文艺术", "urlname": "art" },
  { "id": "home", "name": "家居/家装", "col": 1, "urlname": "home" },
  { "id": "apparel", "name": "女装/搭配", "col": 1, "urlname": "apparel" },
  { "id": "men", "name": "男士/风尚", "col": 2, "urlname": "men" },
  { "id": "modeling_hair", "name": "造型/美妆", "urlname": "modeling_hair" },
  { "id": "diy_crafts", "name": "手工/布艺", "urlname": "diy_crafts" },
  { "id": "food_drink", "name": "美食", "urlname": "food_drink" }
]

// 极简白
export const THEME_LIGHT = 'THEME_LIGHT'
// 极夜黑
export const THEME_DARK = 'THEME_DARK'
// 跟随系统
export const THEME_SYSTEM = 'THEME_SYSTEM'

// 登录方式
export const LOGIN_TYPE_USERNAME = 'username'

// STS 上传数据
export const REGION = 'oss-cn-beijing'  // bucket 存储桶所在区域
export const BUCKET = 'imooc-front'  // bucket 名字
