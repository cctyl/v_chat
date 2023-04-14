var express = require('express');
var router = express.Router();
const vcahtService = require('../../service/vcahtService');

//响应工具类
let R = require("../../utils/R");



/**
 * 获取历史消息
 */
router.get('/history', function (req, res, next) {
   let page =  req.query.page || 0;
   let size =  req.query.size || 10;



});

/**
 * 保存一条消息
 */
router.post('/', async function (req, res, next) {
   console.log(req.body)
   let doc = await vcahtService.save(req.body)
   //响应时，统一使用res.json方法
   //搭配响应工具类，快速生成响应数据
   if (doc)
      res.json(R.ok().setData(doc))
   else
      res.json(R.error().setCode(30001).setMessage("增加出错"))

});


module.exports = router;
