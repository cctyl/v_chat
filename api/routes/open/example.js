var express = require('express');
var router = express.Router();
let R = require("../../utils/R") //响应工具类
let upload = require("../../utils/upload") //上传工具类


/**
 *  文件上传
 * 需要在post方法的第二个参数，调用 upload.single('file')  。file就是表单的name属性
 */
router.post('/upload', upload.single('file'), function (req, res, next) {
    //1.获得上传成功后的文件路径
    //2.先替换掉 public 前缀，这个是静态资源文件路径，实际访问时不需要
    let filePath = req.file.path.replace("..\\file", "")
    //3.上面获取到的路径，在win下，是 \\，在linux 下，就是 /  ,为了处理这个问题，进行一个判断
    if (filePath.indexOf("\\") !== -1) {
        filePath = filePath.replaceAll("\\", "/")
    }
    res.json(R.ok().setData(filePath))
})


module.exports = router;
