var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var session_1 = require('client-sessions');
var MongoStore = require('connect-mongo')(session);
var Url = require('./config/datebase').Url;
var dbUrl = require('./config/datebase').dbUrl;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", Url);//配置客户端
  if (req.method == 'OPTIONS') {
    /*让options请求快速返回*/
    res.send(200);
  }
  else {
    /*防止异步造成多次响应，出现错误*/
    var _send = res.send;
    var sent = false;
    res.send = function (data) {
      if (sent) return;
      _send.bind(res)(data);
      sent = true;
    };
    next();
  }
});

app.use(session({
  secret: 'sessiontest',//与cookieParser中的一致
  resave: true,
  saveUninitialized: false,
  // cookie: { maxAge: 60 * 1000 * 30 }, // 过期时间（毫秒）
  // store: new MongoStore({
  //   url: dbUrl
  // })
}));
// app.use(session_1({
//   cookieName: 'session',
//   secret: 'random_string_goes_here',
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000,
// }));
app.use('/', indexRouter);
app.use('/user', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
