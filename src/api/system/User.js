import axios from '@/request/axios'

export const captchaApi = () => {
    return axios({
        url: '/kky-system/user/captcha',
        method: 'post',
        data: {}
    })
}

export const loginApi = (user) => {
    return axios({
        url: '/kky-system/user/login',
        method: 'post',
        data: user
    })
}