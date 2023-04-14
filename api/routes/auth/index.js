const app = require("../../config/expressApp")
var vchatRouter = require('./vchat');
const prefix = "/auth";
app.use(prefix+'/vchat', vchatRouter);
