const promiseRouter = require("express-promise-router");
const AgencyController = require("../controllers/AgencyController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route =  promiseRouter();
route.get(
  "/",
  // AuthMiddleware.isAuthenticated,
  // AuthMiddleware.isAdmin,
  AgencyController.index
);

route.get(
  "/name",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isAdmin,
  AgencyController.searchByName
);

route.post(
  "/create",
  AgencyController.store
);

module.exports = route;
