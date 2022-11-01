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

// 返回列高对象中最小的高度
export const getMinHeight = columnHeightObj => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

// 返回列高对象中最大的高度
export const getMaxHeight = columnHeightObj => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}

// 返回列高对象中最小高度所在的列下标
export const getMinHeightColumn = columnHeightObj => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find(key => columnHeightObj[key] === minHeight)
}
