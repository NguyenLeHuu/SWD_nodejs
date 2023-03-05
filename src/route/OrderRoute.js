const promiseRouter = require("express-promise-router");
const OrderController = require("../controllers/OrderController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route =  promiseRouter();
route.get(
  "/:id",
  OrderController.index
);

route.post(
  "/add",
  OrderController.store
);

route.put(
    "/update-status/:idorder",
    OrderController.updateStatus
)

route.put(
  "/update-total/:idorder",
  OrderController.updateTotal
)

module.exports = route;
