import request from '@/utils/request'

// 获取用户信息
export const getProfile = data => {
  return request({
    url: '/user/profile',
    data
  })
}

// 修改用户信息
export const putProfile = data => {
  return request({
    url: '/user/profile',
    method: 'put',
    data
  })
}

// 获取 OSS 上传凭证
export const getSts = () => {
  return request({
    url: '/user/sts'
  })
}
