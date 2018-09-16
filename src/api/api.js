import config from '../config/config'

const request = config.request
const API = {

  // wx相关

  // 我的地址相关

  // 新增地址
  queryUser (params) {
    return request({
      url: '/queryUser',
      params: params
    })
  }

}

export default API
