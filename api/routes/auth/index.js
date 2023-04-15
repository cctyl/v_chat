const app = require("../../config/expressApp")
const prefix = "/auth";
app.use(prefix+'/vchat', require('./vchatRouter'));
