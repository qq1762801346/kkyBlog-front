import axios from '@/request/axios'

export const routersApi = () => {
    return axios({
        url: '/kky-system/menu/initRouters',
        method: 'post',
        data: {}
    })
}