import OSS from 'ali-oss'
import { getSts } from '@/api/user'
import { REGION, BUCKET } from '@/constants'

export const getOSSClient = async () => {
  const res = await getSts()
  return new OSS({
    region: REGION,  // bucket 存储桶所在区域
    bucket: BUCKET,  // 存储桶名字
    // id 和 secret 是临时访问密钥
    accessKeyId: res.Credentials.AccessKeyId,  // id
    accessKeySecret: res.Credentials.AccessKeySecret,  // secret
    stsToken: res.Credentials.SecurityToken,  // token
    refreshSTSToken: async () => {  // 刷新 token 回调，token 过期自动调用
      const res = await getSts()
      return {
        accessKeyId: res.CredentiaLs.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.CredentiaLs.SecurityToken
      }
    },
    refreshSTSTokenInterval: 5 * 1000  // 5s 执行一次 refreshSTSToken 回调
  })
}
