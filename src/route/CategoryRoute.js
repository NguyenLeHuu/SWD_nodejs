const promiseRouter = require("express-promise-router");
const CategoryController = require("../controllers/CategoryController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route =  promiseRouter();
route.get(
  "/",
  CategoryController.index
);

route.post(
  "/create",
  CategoryController.store
);

route.put(
    "/update/:id",
    CategoryController.update
)

route.delete(
    "/delete/:id",
    CategoryController.delete
);

module.exports = route;
