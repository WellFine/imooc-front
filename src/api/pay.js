import request from '@/utils/request'

// 获取 VIP 支付套餐列表
export const getVipPayList = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
