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

export const listApi = () => {
    return axios({
        url: 'kky-system/user/list',
        method: 'post',
        data: {}
    })
}

export const submitApi = (data) => {
    return axios({
        url: 'kky-system/user/submit',
        method: 'post',
        data: data
    })
}

export const detailApi = (id) => {
    return axios({
        url: 'kky-system/user/detail',
        method: 'get',
        params: {
            id
        }
    })
}

export const deleteApi = (ids) => {
    return axios({
        url: 'kky-system/user/delete',
        method: 'get',
        params: {
            ids
        }
    })
}