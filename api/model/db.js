/*

用于连接数据库

 */
const mongoose = require('mongoose');


//有密码时
// mongoose.connect('mongodb://admin:111@localhost:27017/11',function (err) {
//
//     if (err)
//         console.log(err)
//     else
//         console.log("数据库连接成功")
// });


//无密码时：
mongoose.connect('mongodb://localhost:27017/vue_chat',function (err) {

    if (err)
        console.log(err)
    else
        console.log("数据库连接成功")
});


module.exports = mongoose
