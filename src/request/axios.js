import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000

// 请求拦截器
axios.interceptors.request.use(config => {
    if(store.getters.getToken) {
        console.log(store.getters.getToken)
        config.headers['Kky-Token'] = store.getters.getToken
    }
    return config
}, error => {
    return Promise.reject(error)
});

// 响应拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
    if(res.data.code === 400) {
        ElMessage.error(res.data.msg)
        return Promise.reject(new Error(res.data.msg))
    }
    return res.data
}, error => {
    switch(error.response.status) {
        case 500:
            ElMessage.error("服务器异常")
            break
    }
    return Promise.reject(error)
})

export default axios
