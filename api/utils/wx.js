let appid = ""  // 微信appid
let secret = "" //微信secret
const request = require('request');


//获取openid和session_key
function code2session(code) {
    var url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code";
    return new Promise(function (resolve, reject) {
        request({
            url: url, //请求的URL
            method: 'GET', //GET方式请求
            encoding: null, //Node默认是UTF-8
            headers: {
                ContentType: 'application/json',
            },
            form: {}
        }, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var data = body.toString();
                data = JSON.parse(data)  //这里会包含一个openid
                resolve(data)
            } else {
                console.log("code2session出错")
                console.log(err)
                console.log(res)
                console.log(body)
                resolve({errmsg: "转换wx code 出错"})
            }
        })
    })
}


module.exports ={
    code2session,

}