import config from '../config/config'

const request = config.request
const API = {

  // 登录
  userLogin (params) {
    return request({
      url: '/login',
      params: params
    })
  },
  // 后台首页数据
  queryIndex (params) {
    return request({
      url: '/queryIndex',
      params: params
    })
  },
  // 用户列表
  queryUser (params) {
    return request({
      url: '/queryUser',
      params: params
    })
  },
  // 用户查看
  queryUserByUid (params) {
    return request({
      url: '/queryUserByUid',
      params: params
    })
  },
  // 删除用户
  deleteUser (params) {
    return request({
      url: '/deleteUser',
      params: params
    })
  },
  // 发货申请
  queryOrder (params) {
    return request({
      url: '/queryOrder',
      params: params
    })
  },
  // 审核发货
  auditOrder (params) {
    return request({
      url: '/auditOrder',
      params: params
    })
  },
  // 提现申请
  queryWithdraw (params) {
    return request({
      url: '/queryWithdraw',
      params: params
    })
  },
  // 审核提现
  auditWithdraw (params) {
    return request({
      url: '/auditWithdraw',
      params: params
    })
  }

}

export default API
