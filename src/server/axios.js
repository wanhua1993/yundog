// 对 axios 进行配置
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.timeout = 30000;
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
const baseURL = 'http://192.168.0.14:3000'

const instance = axios.create()
instance.defaults.timeout = 30000 // 所有接口30s超时

// 请求拦截器
instance.interceptors.request.use(function (config) {
    if (config.url && config.url.charAt(0) === '/') {
        config.url = `${baseURL}${config.url}`
    }

    return config
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
    if (response) {
        return response
    }
    return Promise.reject(response)
}, error => {
    if (error) {
        console.log(JSON.stringify(error))
    } else {
        console.log('出了点问题，暂时加载不出来，请稍后再来吧')
    }
    return Promise.reject(error)
});

export default instance