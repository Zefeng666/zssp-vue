import config from '../config/config'

const request = config.request
const API = {

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
  // 发货申请
  queryOrder (params) {
    return request({
      url: '/queryOrder',
      params: params
    })
  }

}

export default API
