const mongoose = require("./db")

var ContentSchema = mongoose.Schema({
    text: String, // 文本
    duration: Number, // 时长
    imageUrl: String, // 图片地址
    videoUrl: String, // 视频地址
    audioUrl: String, // 音频地址
    fileUrl: String, // 文件地址
    fileName: String, // 文件名称
    fileSize: String, // 文件大小
    fileExt: String, // 文件扩展名
})

var VchatSchema = mongoose.Schema({
    id: {
        type: String,
        default: () => mongoose.Types.ObjectId(),
        unique: true
    }, // 唯一id
    name: String, // 姓名
    avatar: String, // 头像地址
    ip: String, // 发送ip
    content:ContentSchema,
    type: String, // 文件类型:text|image|audio|video|file,
    isCancel:Boolean, // 控制该消息是否已经撤回,
    time: {
        type: String,
        required: true
    } // 发送时间
},{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})

// 第三个参数是数据库中集合的真实名字
var VchatModel =  mongoose.model("vchat",VchatSchema,"vchat")

//向外暴露模型，因为实际只需要模型来操作数据库
module.exports = VchatModel
