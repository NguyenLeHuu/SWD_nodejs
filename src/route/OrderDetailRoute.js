const promiseRouter = require("express-promise-router");
const OrderDetailController = require("../controllers/OrderDetailController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route =  promiseRouter();
route.get(
  "/:id",
  OrderDetailController.index
);

route.post(
  "/add",
  OrderDetailController.store
);

route.put(
    "/update/",
    OrderDetailController.update
)

route.delete(
    "/delete/:id",
    OrderDetailController.delete
);

module.exports = route;
