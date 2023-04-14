const mongoose = require("./db")

//定义schema
//字段和类型都需要和表中一一对应
var ExampleSchema = mongoose.Schema({

    title:String,
    status:String,
    other:String

})

// 第三个参数是数据库中集合的真实名字
var ExampleModel =  mongoose.model("example",ExampleSchema,"example")

//向外暴露模型，因为实际只需要模型来操作数据库
module.exports = ExampleModel
