import Axios from './axios'

// 里面定义 请求的各个方法
const service = {
    // 用户登录
    loginUser: data => Axios.post('/login_in', data),
    // 上传头像
    upload_file: data => Axios.post('/upload_file', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    // 加载 社区 数据 通过后台爬虫来获取数据
    cheerio_data: data => Axios.get('/cheerio_data?count=' + data),
    // 搜索添加好友
    search_friends: data => Axios.get('/search_friends?val=' + data)

}
export default service