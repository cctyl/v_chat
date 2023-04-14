var express = require('express');
var router = express.Router();
//响应工具类
let R = require("../../utils/R");

/**
 * 示例：基本接口的使用
 */
router.get('/', function (req, res, next) {
    res.json(R.ok().setMessage("成功访问 testAuth" + req.userId).setData())
});


module.exports = router;
