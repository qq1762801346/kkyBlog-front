import request from '@/request/axios'

export const detail = () => {
    return request({
        url: '/demo/test',
        method: 'get',
        params: {

        }
    })
}