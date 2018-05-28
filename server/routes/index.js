var express = require('express');
var router = express.Router();
var User_all = require('../model/user/user');
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
router.get('/add_friend', function (req, res){
  User_all.add_friend(req, res, function (err, ret) {
    if(err) {
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
  User_all.load_friends_req(req, res, function (err, ret){
    if(err) {
      console.log(err);
    } else {
      res.send({
        value: ret
      });
    }
  });
});
// 同意成为好友
router.get('/agree_friends', function (req, res){
  User_all.agree_friends(req, res, function (ret1, ret2){
    res.send({
      value_0: ret1,
      value_1: ret2
    });
  });
});
module.exports = router;
