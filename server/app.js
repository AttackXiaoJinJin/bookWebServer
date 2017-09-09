var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var positions = require('./routes/position');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//request上提交的数据都转化为Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 解决跨域,不能写在app.use(bodyParser.json());上面
app.all("*",function (request,response,next) {
    //写上跨域
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderField");
    // console.log("this is use");
    //浏览器为安全起见会提交两次
    if(request.method=="OPTIONS"){
        // console.log("this is options");
        response.sendStatus(200);
    }else{
        //往下寻找接口
        next();
    }
});
app.use('/', index);
app.use('/users', users);
app.use('/positions', positions);

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
