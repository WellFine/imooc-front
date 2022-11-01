// 从 itemElements 元素列表中抽离出所有 img 元素
export const getImgElements = itemElements => {
  const imgElements = []
  itemElements.forEach(el => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

// 生成所有图片的链接数组
export const getAllImg = imgElements => {
  return imgElements.map(img => img.src)
}

// 监听图片数组加载完成
export const onCompleteImgs = imgs => {
  const promiseAll = []
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise(resolve => {
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        resolve({ img, index })
      }
    })
  })
  return Promise.all(promiseAll)
}
