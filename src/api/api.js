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
  // 用户搜索
  queryUserSearch (params) {
    return request({
      url: '/queryUser/search',
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
  // 查询历史发货记录
  queryOrderHistory (params) {
    return request({
      url: '/queryOrder/history',
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
  },
  // 查询历史提现记录
  queryWithdrawHistory (params) {
    return request({
      url: '/queryWithdraw/history',
      params: params
    })
  },
  // 身份证审核
  queryUnReviewIdCard (params) {
    return request({
      url: '/queryUnReviewIdCard',
      params: params
    })
  },
  // 审核身份证
  reviewIdCard (params) {
    return request({
      url: '/reviewIdCard',
      params: params
    })
  },
  // 查询所有身份证
  queryIdCardHistory (params) {
    return request({
      url: '/queryIdCard/history',
      params: params
    })
  }
}

export default API
