import md5 from 'md5'

/**
 * 获取接口请求密钥 icode 和 codetype
 * icode 有效期为一个月，如果过期请查看以下两个链接中 icode 相关配置是否改动
 * https://github.com/LLLarry/front/blob/master/src/utils/index.js
 * https://github.com/mafqla/imooc-admin/blob/4a1577e9103def69125133a0905526294fa43a68/src/utils/request.js
 */
export const getSecret = () => {
  const codetype = Number.parseInt(Date.now() / Math.pow(10, 3))
  const icode = md5(`${codetype}LGD_Sunday-1991-12-30`)
  return {
    codetype,
    icode
  }
}
