import Axios from 'axios'
import { removeToken } from './token'
// import { getToken } from './token.js'

const axios = Axios.create({
  baseURL: 'http://toutiao.itheima.net',
  Timeout: 1000
})
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })
}
// 添加响应拦截器
axios.interceptors.response.use(function (response) { // 当状态码为2xx/3xx开头的进这里
  // 对响应数据做点什么
  return response
}, async function (error) { // 响应状态码4xx/5xx进这里
  // 对响应错误做点什么
  // console.dir(error)
  if (error.response.status === 401) { // 身份过期
    // token续签方式1:  去登录页重新登录, token无用, 清掉-确保路由守卫if进不去
    removeToken()
    this.$router.push({ path: '/login' })
  }

  return Promise.reject(error)
})
// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // 目标: 统一携带token
//   // 判断本地有token再携带, 判断具体api/index.js里如果没有携带Authorization, 我在添加上去
//   // 未定义叫undefined, null具体的值你得赋予才叫空
//   // ?. 可选链操作符, 如果前面对象里没有length, 整个表达式原地返回undefined
//   // 如果getToken()在原地有值token字符串, 才能调用length获取长度
//   if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
//     config.headers.Authorization = `Bearer ${getToken()}`
//   }
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })
