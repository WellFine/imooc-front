import request from '@/utils/request'

// 人类行为验证
export const getCaptcha = data => {
  return request({
    url: '/sys/captcha',
    method: 'post',
    data
  })
}

// 登录
export const loginUser = data => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 注册
export const registerUser = data => {
  return request({
    url: '/sys/register',
    method: 'post',
    data
  })
}
