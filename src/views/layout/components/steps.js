export default [{
  element: '.guide-home',  // 在哪个元素进行引导
  popover: {  // 弹出的引导窗口
    title: 'logo',  // 标题
    description: '点击可以返回首页'  // 描述文本
  }
}, {
  element: '.guide-search',
  popover: {
    title: '搜索',
    description: '搜索想要的图片'
  }
}, {
  element: '.guide-theme',
  popover: {
    title: '风格',
    description: '选择一个喜欢的风格',
    position: 'left'
  }
}, {
  element: '.guide-my',
  popover: {
    title: '账户',
    description: '这里标记着账户信息',
    position: 'left'
  }
}, {
  element: '.guide-start',
  popover: {
    title: '引导',
    description: '这里可以再次查看引导信息',
    position: 'left'
  }
}, {
  element: '.guide-feedback',
  popover: {
    title: '反馈',
    description: '意见反馈',
    position: 'left'
  }
}]
