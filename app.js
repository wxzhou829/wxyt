var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('config-lite')(__dirname);

var index = require('./routes/index');
var users = require('./routes/users');
var sczc = require('./routes/sczc');
var query = require("./routes/query");
var sbwx = require("./routes/sbwx");
var peijian = require("./routes/peijian");
var ajax = require("./routes/ajax");


var checkNotLogin = require('./middlewares/check').checkNotLogin;
var checkLogin = require('./middlewares/check').checkLogin;


var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'insert_your_database_url_here';
var mongoDB = config.mongodb;
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));

app.use(function(req, res, next){
	res.locals.session_user = req.session.user;
	next();
})

app.use('/', index);
app.use('/users', users);
app.use('/query',  query);
app.use('/ajax', ajax);
app.use('/sczc', checkLogin);
app.use('/sczc', sczc);
app.use('/sbwx', checkLogin);
app.use('/sbwx',  sbwx);
app.use('/peijian', checkLogin);
app.use('/peijian',  peijian);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
