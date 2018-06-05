var User = require('../db/schema').User;
var Friends = require('../db/schema').Friends;
var Reports = require('../db/schema').Reports;
var upload_file = require('../formdata/upload_file');
var cheerio_f = require('../cheerio/cheerio');
var moment = require('moment');
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
        Friends.find(wherestr, function (err, res) {
            callback(err, res);
        })
    },
    // 点击签到
    async report_in(req, res, callback) {
        var user_id = req.session.user._id;
        // 先判断是否已经签到过
        var now_time = moment().format('L');
        var day = Number(now_time.split('-')[2]);
        var sort = {
            'createT': -1
        };
        var data_0 = await new Promise((resolve) => {
            Reports.find({
                'user_id': user_id,
            }).sort(sort).exec(function (err, data) {
                resolve(data);
            });
        });
        console.log(data_0);
        if (data_0.length) {
            var day_0 = Number(data_0[0].report_time.split('/')[0]);
            if (now_time == data_0[0].report_time) {
                // 表示已经签到过了
                console.log('今天已经签到过了!');
                callback(null, '2001', data_0.length);
            } else {
                // 表示没有签到 没有签到的时候 要判断是否是连续签到 如果是连续签到 那么++ 否则的话 为 0
                // if (day_0 + 1 == day) {
                //     console.log('连续签到！');
                //     var uid = data_0.uid + 1;
                //     // 表示是连续签到 那么 uid++
                // } else {
                //     console.log('没有连续签到！');
                //     // 表示不是连续签到 那么 uid == 0
                //     var uid = 0;
                // }
                var report = new Reports({
                    user_id: user_id,
                    report_time: moment().format('L'),
                    uid: 0
                });
                report.save(function (err, res) {
                    callback(err, res, data_0.length);
                });
            }
        } else {
            var report = new Reports({
                user_id: user_id,
                report_time: moment().format('L'),
                uid: 0
            });
            report.save(function (err, res) {
                callback(err, res, 1);
            });
        }

    },

    /*    签到时，判断uid上一次签到的日期是否和当前日期的昨天一致， 
          1、如果uid上一次签到为空，则连续签到由0更新为1 
          2、如果相同，则连续签到++1 
          3、如果不同，则连续签到更新为1 
          4、为了兼容之前数据，在判断时重新组合年月日。 随后的插入操作都有last_signdate日期，可以用它直接判断 
    */
    // 获取签到天数
    get_days(req, res, callback) {
        var user = req.session.user;
        var wherestr = {
            "user_id": user._id,
        };
        Reports.count(wherestr, function (err, res) {
            callback(err, res);
        });
    }
}
module.exports = User_all;