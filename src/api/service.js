import axios from 'axios'
import Adapter from 'axios-mock-adapter'
import { get } from 'lodash'
import util from '@/libs/util'
import { errorLog, errorCreate } from './tools'
import * as dd from 'dingtalk-jsapi'
import api from '@/api'
import { domain } from '@/dataDic.js' 

function formatObj (obj) {
  Object.keys(obj).forEach(item=>{
      if(obj[item] !== 0 && !obj[item])  delete obj[item]
  })
  return obj;
}

/**
 * @description 创建请求实例
 */
function createService () {
  // 创建一个 axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    config => config,
    error => {
      // 发送失败
      console.log(error)
      return Promise.reject(error)
    }
  )
  // 响应拦截
  service.interceptors.response.use(
    response => {
      // dataAxios 是 axios 返回数据中的 data
      const dataAxios = response.data
      // 这个状态码是和后端约定的
      const { code } = dataAxios
      // 根据 code 进行判断
      if (code === undefined) {
        // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
        return dataAxios
      } else {
        // 有 code 代表这是一个后端接口 可以进行进一步的判断
        switch (code) {
          case 0:
            // [ 示例 ] code === 0 代表没有错误
            return dataAxios
            break
          case -1:
            // [ 示例 ] 其它和后台约定的 code
            return dataAxios
            break
          case 9997:
            const corpId = 'dingcd0f5a2514db343b35c2f4657eb6378f'
            dd.ready(function () {
              dd.runtime.permission.requestAuthCode({
                corpId: corpId, // 企业id
                onSuccess: (info) => {
                  const code = info.code // 通过该免登授权码可以获取用户身份
                  let data = {
                    code: code,
                    corpId: corpId
                  }
                  api.DING_LOGIN(data)
                    .then(async (res) => {
                      util.cookies.set('uuid', res.data.jobnumber)
                      util.cookies.set('token', res.token)
                    })
                    .catch(err => {
                      console.log('err', err)
                    })
                }
              })
            })
            break
          default:
            // 不是正确的 code
            errorCreate(`${dataAxios.msg}: ${response.config.url}`)
            break
        }
      }
    },
    error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400: error.message = '请求错误'; break
          case 401: error.message = '未授权，请登录'; break
          case 403: error.message = '拒绝访问'; break
          case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
          case 408: error.message = '请求超时'; break
          case 500: error.message = '服务器内部错误'; break
          case 501: error.message = '服务未实现'; break
          case 502: error.message = '网关错误'; break
          case 503: error.message = '服务不可用'; break
          case 504: error.message = '网关超时'; break
          case 505: error.message = 'HTTP版本不受支持'; break
          default: break
        }
      }
      errorLog(error)
      return Promise.reject(error)
    }
  )
  return service
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
function createRequestFunction (service) {
  return function (config) {

    let baseURL = config.baseUrl?config.baseUrl:domain+'/Interface'

    // let baseURL = config.baseUrl?config.baseUrl:'http://192.168.40.161:5001/Interface'

    // let baseURL = config.baseUrl?config.baseUrl:'http://222.186.81.37:5000/Interface'
    // let baseURL = config.baseUrl?config.baseUrl:'http://127.0.0.1:5001/Interface'

    const token = util.cookies.get('token')
    const configDefault = {
      headers: {
        Authorization: token,
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      timeout: 30000,
      baseURL: baseURL,
      // baseURL: process.env.VUE_APP_API,
      data: {}
    }
    config.data = formatObj(config.data)
    return service(Object.assign(configDefault, config))
  }
}

// 用于真实网络请求的实例和请求方法
export const service = createService()
export const request = createRequestFunction(service)

// 用于模拟网络请求的实例和请求方法
export const serviceForMock = createService()
export const requestForMock = createRequestFunction(serviceForMock)

// 网络请求数据模拟工具
export const mock = new Adapter(serviceForMock)
