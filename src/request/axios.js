import axios from 'axios'


// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
    return res.data
})

export default axios
