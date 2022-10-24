import request from '@/utils/request'

/**
 * 获取图片数据列表
 */
export const getPexelsList = data => {
  return request({
    url: '/pexels/list',
    params: data
  })
}
