/**
 * 用户名表单校验
 * @param {string} val 输入的内容
 * @returns true 表示表单校验通过，String 表示表单校验未通过，字符串为错误提示消息
 */
export const validateUsername = val => {
  if (!val) return '用户名为必填内容'
  if (val.length < 3 || val.length > 12) return '用户名应该在 3-12 位之间'
  return true
}

export const validatePassword = val => {
  if (!val) return '密码为必填内容'
  if (val.length < 6 || val.length > 12) return '密码应该在 6-12 位之间'
  return true
}
