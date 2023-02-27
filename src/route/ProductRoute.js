const promiseRouter = require("express-promise-router");
const ProductController = require("../controllers/ProductController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route =  promiseRouter();
route.get(
  "/",
  ProductController.index
);

route.post(
  "/create",
  ProductController.store
);

module.exports = route;
