import axios from 'axios'
import { ElMessage } from 'element-plus'

// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
    if(res.data.code === 400) {
        ElMessage({
            message: res.data.msg,
            type: 'error'
        })
        return Promise.reject(new Error(res.data.msg))
    }
    return res.data
})

export default axios
