const promiseRouter = require("express-promise-router");
const CollectionController = require("../controllers/CollectionController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route =  promiseRouter();
route.get(
  "/",
  CollectionController.index
);

route.get(
  "/:id",
  CollectionController.getOne
);

route.post(
  "/create",
  CollectionController.store
);

route.put(
    "/update/:id",
    CollectionController.update
)

route.delete(
    "/:id",
    CollectionController.delete
);

module.exports = route;
