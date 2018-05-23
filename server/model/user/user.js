var User = require('../db/schema').User;
const User_all = {
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
    }
}
module.exports = User_all;