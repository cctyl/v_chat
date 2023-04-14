var express = require('express');
var router = express.Router();
let R = require("../../utils/R") //响应工具类
let upload = require("../../utils/upload") //上传工具类
let path = require("path")  //路径处理模块
let excel = require("../../utils/excel") //excel 处理工具类
let word = require("../../utils/word") //word 处理工具类

/**
 * 示例：基本接口的使用
 */
router.get('/', function (req, res, next) {
    res.json(R.ok().setMessage("这里是example页面").setData())
});


/**
 * 示例接口： 演示如何通过 async await 调用 service中的方法
 * 注意回调函数加上了async
 */
router.get('/add', async function (req, res, next) {

    //操作service，注意，必须加上await，方法上也需要加上async
    // let doc = await exampleService.saveExample({
    //     title: "33",
    //     status: "22",
    //     other: "11"
    // })
    // //响应时，统一使用res.json方法
    // //搭配响应工具类，快速生成响应数据
    // if (doc)
    //     res.json(R.ok().setData(doc))
    // else
    //     res.json(R.error().setCode(30001).setMessage("增加出错"))
});


/**
 * 示例接口： 文件上传
 * 需要在post方法的第二个参数，调用 upload.single('file')  。file就是表单的name属性
 */
router.post('/upload', upload.single('file'), function (req, res, next) {

    //1.获得上传成功后的文件路径
    //2.先替换掉 public 前缀，这个是静态资源文件路径，实际访问时不需要
    let filePath = req.file.path.replace("public", "")

    //3.上面获取到的路径，在win下，是 \\，在linux 下，就是 /  ,为了处理这个问题，进行一个判断
    if (filePath.indexOf("\\") !== -1) {
        // console.log("处理斜杠")
        filePath = filePath.replaceAll("\\", "/")
    }
    res.json(R.ok().setData({filePath}))
})


/**
 * 示例接口： 上传excel并读取数据,然后写入到本地存储
 */
router.post('/upload/excle', upload.single('excel'), function (req, res, next) {

    //读取excel，返回二维数组。第一层是一个sheet，第二层是sheet中的每一行。每一列数据通过下标从行数组中取出
    let readExcel = excel.readExcel(req.file.path, 0);
    console.log(readExcel)
    //写入文件
    let path = excel.writeExcelSingle(readExcel);
    res.json(R.ok().setData({path}))
})


/**
 * 示例接口： 根据模板以及数据，生成docx文件
 */
router.get("/docx", function (req, res, next) {
    let accessPath = word.exportWord("public/template/t4.docx", {
        dsj: "kk",
        xtsx: "xhshs",
        jctbry: "zhangsan"
    });
    res.json(R.ok().setData(accessPath))

})


module.exports = router;
