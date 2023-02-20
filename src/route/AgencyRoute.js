const promiseRouter = require("express-promise-router");
const AgencyController = require("../controllers/AgencyController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route =  promiseRouter();
route.get(
  "/test",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isAdmin,
  AgencyController.index
);

module.exports = route;
