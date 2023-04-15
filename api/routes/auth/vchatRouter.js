var express = require('express');
var router = express.Router();
const vcahtService = require('../../service/vcahtService');

//响应工具类
let R = require("../../utils/R");


/**
 * 保存一条消息
 */
router.post('/', async function (req, res, next) {
    console.log(req.body)
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

    try {
        await vcahtService.saveMany(req.body)
        res.json(R.ok().setData(req.body.length))
    } catch (error) {
        res.json(R.error().setMessage(error.message))
    }
});

/**
 * 保存多条消息
 */
router.get('/list', async function (req, res, next) {
    let page = req.query.page || 1;
    let size = req.query.size || 10;
    let data = await vcahtService.pageFind(page, size);
    res.json(R.ok().setData().setData(data))
});


module.exports = router;
