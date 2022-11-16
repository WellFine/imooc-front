import request from '@/utils/request'

// 人类行为验证
export const getCaptcha = data => {
  return request({
    url: '/sys/captcha',
    method: 'post',
    data
  })
}
