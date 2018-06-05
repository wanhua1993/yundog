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
    search_friends: data => Axios.get('/search_friends?val=' + data),
    // 加他好友
    add_friend: data => Axios.get('/add_friend?fri_id=' + data.fri_id + '&my_id=' + data.my_id),
    // 加载好友请求
    load_friends_req: data => Axios.get('/load_friends_req?fri_id=' + data),
    // 同意成为好友
    agree_friends: data => Axios.get('/agree_friends?fri_id=' + data.fri_id + '&my_id=' + data.my_id + '&id=' + data.id),
    // 加载好友列表
    load_friends: data => Axios.get('/load_friends'),
    // 检查好友是否存在过
    check_friends: data => Axios.post('/check_friends', data),
    // 点击签到
    report_in: data => Axios.get('/report_in'),
    // 获取签到天数
    get_days: data => Axios.get('/get_days')

}
export default service