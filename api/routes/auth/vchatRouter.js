var express = require('express');
var router = express.Router();
const vcahtService = require('../../service/vcahtService');

//响应工具类
let R = require("../../utils/R");
let ip = require("../../utils/ip");


router.get('/getMyIp',  function (req, res, next) {
    res.json(R.ok().setData(ip.getIp(req)))
});

/**
 * 保存一条消息
 */
router.post('/', async function (req, res, next) {
    let vchatObj = req.body
    vchatObj.name = ip.getIp(req)
    console.log(ip.getIp(req))
    let doc = await vcahtService.save(req.body)
    if (doc)
        res.json(R.ok().setData(doc))
    else
        res.json(R.error().setMessage("增加出错"))

});

/**
 * 保存多条消息
 */
router.post('/list', async function (req, res, next) {

    await vcahtService.saveMany(req.body)
    res.json(R.ok().setData(req.body.length))


});

/**
 * 分页查询消息
 */
router.get('/list', async function (req, res, next) {
    let page = req.query.page || 1;
    let size = req.query.size || 10;
    let data = (await vcahtService.pageFind(page, size)).sort((a,b)=>a.created - b.created );
    res.json(R.ok().setData(data))
});

/**
 * 清空
 */
router.put('/clear', async function (req, res, next) {

    let data = await vcahtService.clearMsg();
    res.json(R.ok().setData(data))
});


module.exports = router;
