var User = require('../db/schema').User;
var Friends = require('../db/schema').Friends;
var Reports = require('../db/schema').Reports;
var upload_file = require('../formdata/upload_file');
var cheerio_f = require('../cheerio/cheerio');

const User_all = {
    // 注册用户
    save(req, res, callback) {
        var val = req.body;
        var use = new User({
            username: val.username,
            password: val.password
        });
        use.save(function (err, res) {
            callback(err, res);
        });
    },
    // 查找用户
    find_by_username(req, res, callback) {
        var val = req.body;
        var wherestr = {
            'username': val.username,
            'password': val.password
        };
        // var opt = { "username": 1, "_id": 0 }; // 表示 输出只会有username字段，设置方法如上，1表示查询输出该字段，0表示不输出
        User.find(wherestr, function (err, res) {
            callback(err, res);
        });
    },
    // 上传头像
    upload_photo(req, res, callback) {
        upload_file(req, res, function (err, path, fields) {
            var id = fields.id;
            var updatestr = { 'avatar': path };
            User.findByIdAndUpdate(id, updatestr, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    console.log("Res:" + res);
                    callback(err, path);
                }
            });
        })
    },
    // 社区 爬虫爬取 狗狗数据
    cheerio_data(req, res, callback) {
        var count = req.query.count;
        var url = '';
        if (count == 1) {
            url = 'http://www.goupu.com.cn/photo/list-34.html';
        } else {
            url = 'http://www.goupu.com.cn/photo/list-34-' + count + '.html';
        }
        cheerio_f(url, function (data) {
            callback(data);
        });
    },
    // 搜素添加好友
    search_friends(req, res, callback) {
        var val = req.query.val;
        const reg = new RegExp(val, 'i') //不区分大小写
        var wherestr = {
            $or: [ //多条件，数组
                { username: reg },
            ]
        }
        User.find(wherestr, function (err, res) {
            callback(err, res);
        });
    },
    // 加他好友
    add_friend(req, res, callback) {
        var val = req.query;
        var friends = new Friends({
            my_id: val.my_id,
            fri_id: val.fri_id,
        });
        friends.save(function (err, res) {
            callback(err, res);
        });
    },
    // 加载好友请求列表
    load_friends_req(req, res, callback) {
        var fri_id = req.query.fri_id;
        var wherestr = {
            "fri_id": fri_id,
            "active": 0
        };
        Friends.find(wherestr).populate('my_id').exec(function (err, res) {
            callback(err, res);
        });
    },
    // 同意成为好友
    async agree_friends(req, res, callback) {
        var val = req.query;
        var friends = new Friends({
            my_id: val.fri_id,
            fri_id: val.my_id,
            status: 1,
            active: 1
        });
        var id = val.id;
        var updatestr = {
            'status': 1,
        };

        var data1 = await new Promise((resolve) => {
            friends.save(function (err, res) {
                resolve(res);
            });
        });

        // 假装请求数据2且此请求依赖数据1
        var data2 = await new Promise((resolve) => {
            Friends.findByIdAndUpdate(id, updatestr, function (err, res) {
                resolve(res);
            });
        });
        callback(data1, data2);
    },
    // 加载好友列表
    load_friends(req, res, callback) {
        var user = req.session.user;
        console.log(user);
        var wherestr = {
            "my_id": user._id,
            "status": 1
        };
        Friends.find(wherestr).populate('fri_id').exec(function (err, res) {
            callback(err, res);
        });
    },
    // 检查好友是否已经添加过
    check_friends(req, res, callback) {
        var fri_id = req.body.id;
        var wherestr = {
            "fri_id": fri_id,
            "status": 1
        }
        Friends.find(wherestr, function(err, res) {
            callback(err, res);
        })
    },
    // 点击签到
    report_in(req, res, callback) {
        var user_id = req.session.user._id;
        var report = new Reports({
            user_id: user_id
        });
        report.save(function (err, res) {
            callback(err, res);
        });
    }
}
module.exports = User_all;