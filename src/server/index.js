import Axios from './axios'

// 里面定义 请求的各个方法
const service = {
    // 用户登录
    loginUser: data => Axios.post('/login_in', data),
}
export default service