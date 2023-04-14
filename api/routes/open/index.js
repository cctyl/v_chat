const app = require("../../config/expressApp")
const exampleRouter = require('./example');
const prefix = "/open";


app.use(prefix + '/example', exampleRouter);// 二级路由 示例接口，有以下示例方法
