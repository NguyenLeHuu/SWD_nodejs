const promiseRouter = require("express-promise-router");
const CreatorController = require("../controllers/CreatorController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route =  promiseRouter();
route.get(
  "/",
  CreatorController.getAll
);

// route.get(
//   "/name",
//   AuthMiddleware.isAuthenticated,
//   AuthMiddleware.isAdmin,
//   CreatorController.searchByName
// );


module.exports = route;
