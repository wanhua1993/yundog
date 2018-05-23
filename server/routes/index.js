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

module.exports = router;
