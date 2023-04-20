const app = require("../../config/expressApp")
const prefix = "/api/auth";
app.use(prefix+'/vchat', require('./vchatRouter'));
