import request from '@/fetch/index'

// TODO 示例
/**
 *  登录
 * @param {object} {nickname: '用户名', password: '密码'}
 * @returns { token }
 */
export function login(params) {
    return request.post('/auth/login', params)
}

// TODO 示例 登出处理
export function logout() {
    return request({
        url: '/auth/logout',
        method: 'post'
    })
}
