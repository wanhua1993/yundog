// 对 axios 进行配置
import axios from 'axios'

const baseUrl = '';

const instance = axios.create();

// 请求拦截器
instance.interceptors.response.use(function (config) {
    console.log(config);
    return config
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.request.use(function (response) {
    if (response.status === 200) {
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