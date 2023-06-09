const createError = require('http-errors');
const express = require('express');
require('express-async-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config')
//jwt生成
const jwt = require("./utils/jwt");
const R = require("./utils/R");
//参数错误解析
const {ValidationError} = require('express-validation');
const app = require("./config/expressApp");
const port = 8081;

//------------------中间件配置区域-----------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


//----------------------一级路由配置区域  start-----------------------------
//设置跨域访问
app.all("*", function (req, res, next) {

    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With") //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")//可以带cookies
    res.header("Access-Control-Allow-Credentials", true)
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
})
//该路径以当前文件为对照，也就是以app.js作为对照
// app.use(express.static('../public'));
app.use("/api/file", express.static('../file'));


//--------不需要携带token访问 ----------

require("./routes/open");


/**
 * token拦截器，这个方法后面的所有接口都需要携带token
 */
app.use((req, res, next) => {
    //1.从请求头中拿到token
    try {
        let token = req.headers.authorization? req.headers.authorization.substring(7) : '';
        if (!token){
            return res.json(R.error().setMessage('请携带token访问'));
        }
        //临时测试
        if (token !==config.defaultToken){
            console.log(`错误的token=${token}`)
            console.log(`正确的token=${config.defaultToken}`)
            return  res.json(R.error().setMessage('token异常！').setCode(R.code.tokenExpire));
        }else {
            next();
        }
        //2.token非空判断
/*        if (token) {
            //3.解析token
            let result = jwt.decrypt(token);

            //4. 取出userid
            let userId = result.userId;

            //5.判断userid是否存在，存在则解析成功，不存在则说明出错
            if (userId) {
                //6.解析成功则放入请求头
                req.userId = userId;

                //7.放行到下一个方法
                next();
            } else {
                //解析失败，不放行，返回错误提示
                res.json(R.error().setMessage(result.errmsg));
            }
        } else {
            //没携带token访问，不放行
            res.json(R.error().setMessage("请登录后再访问"));
        }*/
    } catch (e) {
        console.error(e.message)
    }
});


//--------需要携带token访问 start----------

require("./routes/auth");


//----------------------一级路由配置区域  end-----------------------------

// 处理404 找不到 路由 / 文件异常
app.use(function (req, res, next) {
    //这里放行后，会走到最下面的全局异常处理方法
    next(createError(404));
});

//参数校验出错的拦截器
app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    console.log(err);
    return res.json(R.error().setCode(err.status || 500).setMessage(err.message))
});

// 全局异常处理
app.use(function (err, req, res, next) {
    console.log("异常处理被触发");
    //打印异常日志
    console.log(err);
    //发送错误响应
    return res.json(R.error().setCode(err.status || 500).setMessage(err.message))
});

process.env.PORT = port;
module.exports = app;
