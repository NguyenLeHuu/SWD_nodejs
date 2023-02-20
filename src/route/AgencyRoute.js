const promiseRouter = require("express-promise-router");
const AgencyController = require('../controllers/AgencyController')
const authenToken = require('../services/AuthenToken')

let route =  promiseRouter();

route.get("/test",authenToken,AgencyController.index);

module.exports = route;