import request from '@/utils/request'

// 获取用户信息
export const getProfile = data => {
  return request({
    url: '/user/profile',
    data
  })
}
