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
  // 新升级用户列表
  queryNewUser(params) {
    return request({
      url: '/queryNewUser',
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
  // 下面两级的用户
  queryUnderlingUser(params) {
    return request({
      url: '/queryUnderlingUser',
      params: params
    })
  },
  // 收益明细
  queryIntegrals(params) {
    return request({
      url: '/queryIntegrals',
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
  // 编辑用户
  alterUser (params) {
    return request({
      url: '/alterUser',
      params: params
    })
  },
  // 查询用户订单
  queryOrderByUid(params) {
    return request({
      url: '/queryOrderByUid',
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
  // 查询线下支付订单
  queryOfflineOrder(params) {
    return request({
      url: '/queryOfflineOrder',
      params: params
    })
  },
  // 将订单置为支付状态
  payFinishOrder(params) {
    return request({
      url: '/payFinishOrder',
      params: params
    })
  },
  // 报单审核列表
  queryUpgradeOrder(params) {
    return request({
      url: '/queryUpgradeOrder',
      params: params
    })
  },
  // 报单审核历史
  queryUpgradeOrderHistory(params) {
    return request({
      url: '/queryUpgradeOrder/history',
      params: params
    })
  },
  // 审核报单
  auditUpgradeOrder(params) {
    return request({
      url: '/auditUpgradeOrder',
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
  },
  // 查询所有商品
  queryAllProducts(params) {
    return request({
      url: '/queryAllProducts',
      params: params
    })
  },
  // 获取千牛token
  getQnToken(params) {
    return request({
      url: '/getQnToken',
      params: params
    })
  },
  // 新增商品
  insertProduct(params) {
    return request({
      url: '/insertProduct',
      params: params
    })
  },
  // 编辑商品
  alterProduct(params) {
    return request({
      url: '/alterProduct',
      params: params
    })
  },
  // 下架商品
  cancelProduct(params) {
    return request({
      url: '/cancelProduct',
      params: params
    })
  },
}

export default API
