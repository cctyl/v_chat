const mongoose = require("./db")

//定义schema
//字段和类型都需要和表中一一对应
var UserSchema = mongoose.Schema({

    username:{
        type:String,
        trim: true,
        required:true
    },
    password:{
        type: String,
        trim: true,
        required:true
    },
    openid:String

})

// 第三个参数是数据库中集合的真实名字
var UserModel =  mongoose.model("user",UserSchema,"user")

//向外暴露模型，因为实际只需要模型来操作数据库
module.exports = UserModel
