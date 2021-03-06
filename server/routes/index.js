var express = require('express');
var router = express.Router();
var User_all = require('../model/user/user');
const getToken = require('../rongcloud/rongcloud');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 用户登录
router.post('/login_in', function (req, res) {
  User_all.find_by_username(req, res, function (err, ret) {
    if (err) {
      console.log(err);
    } else {
      req.session.user = ret[0];
      res.send({
        value: ret
      });
    }
  })
});
// 上传头像
router.post('/upload_file', function (req, res) {
  User_all.upload_photo(req, res, function (err, ret) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        value: ret
      });
    }
  });
});
// 通过爬虫 来爬取 狗狗的数据
router.get('/cheerio_data', function (req, res) {
  User_all.cheerio_data(req, res, function (ret) {
    res.send({
      value: ret
    });
  })
});
// 搜索添加好友
router.get('/search_friends', function (req, res) {
  User_all.search_friends(req, res, function (err, ret) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        value: ret
      });
    }
  });
});
// 加他好友
router.get('/add_friend', function (req, res) {
  User_all.add_friend(req, res, function (err, ret) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        value: ret
      });
    }
  });
});
// 加载好友请求列表
router.get('/load_friends_req', function (req, res) {
  User_all.load_friends_req(req, res, function (err, ret) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        value: ret
      });
    }
  });
});
// 同意成为好友
router.get('/agree_friends', function (req, res) {
  User_all.agree_friends(req, res, function (ret1, ret2) {
    res.send({
      value_0: ret1,
      value_1: ret2
    });
  });
});
// 加载好友列表
router.get('/load_friends', function (req, res) {
  User_all.load_friends(req, res, function (err, ret) {
    if (err) {
      console.log(err);
    } else {

      res.send({
        value: ret
      });
    }
  });
});
// 检查好友是否已经添加过
router.post('/check_friends', function (req, res, next) {
  User_all.check_friends(req, res, function (err, ret) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        value: ret
      });
    }
  });
});
// 点击签到
router.get('/report_in', function (req, res, next) {
  User_all.report_in(req, res, function (err, ret, days) {
    if (err) {
      console.log(err);
    } else {
      if (ret == '2001') {
        var val = {
          status: 2001,
          ret: '今天已经签到过了！',
          days: days
        }
      } else {
        var val = {
          status: 200,
          value: ret,
          days: days
        }
      }
      res.send(val);
    }
  });
});
// 获取签到天数
router.get('/get_days', function (req, res) {
  User_all.get_days(req, res, function (err, ret) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        value: ret
      });
    }
  })
});

// 通过融云获取 token 值
router.get('/get_token', function (req, res, next) {
  let id = req.query.userId;
  getToken(id, function (token){
    res.send({
        code: '200',
        token: token
    });
})
});
module.exports = router;
