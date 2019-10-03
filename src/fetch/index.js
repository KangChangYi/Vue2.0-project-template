import axios from 'axios'
import Qs from 'qs'

// TODO 不同环境 api 地址切换
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
    baseURL = '/api'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = process.env.VUE_APP_BASE_API || '/api'
}

// 公共参数配置
const service = axios.create({
    baseURL,
    timeout: 40000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 在向服务器发送前，修改请求数据，只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    transformRequest: [
        function(data) {
            data = Qs.stringify(data)
            return data
        }
    ],
    // 表示跨域请求时是否需要使用凭证
    withCredentials: true
})

// 拦截请求
service.interceptors.request.use(
    config => {
        // TODO 可配置在 header 中携带 token
        // const token = store.state.user.token
        // if (token) {
        //     config.headers['x-auth-token'] = token
        // }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 拦截响应
// 在实例已创建后修改默认值
// 返回结果公共处理
service.interceptors.response.use(
    response => {
    // 如果返回的状态码是200，说明接口请求成功，
    // 否则抛出错误
        if (response.status === 200) {
            // 接下去的错误统一处理
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    //  服务器状态码不是2开头的情况
    // 根据状态码进行一些操作
    error => {
        if (error.response.status) {
            switch (error.response.status) {
            // 401: 未登录
            case 401:
                // TODO 统一报错处理、登陆过期重定向
                break
            // 403 token过期
            case 403:
                // TODO 统一报错处理、登陆过期重定向
                break
            // 403 token过期
            case 404:
                // TODO 统一报错处理
                break
            default:
                // TODO 统一报错处理
            }
            return Promise.reject(error.response)
        }
    }
)

export default service
