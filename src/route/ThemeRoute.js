const promiseRouter = require("express-promise-router");
const ThemeController = require("../controllers/ThemeController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route =  promiseRouter();
route.get(
  "/",
  ThemeController.index
);

route.get(
  "/:id",
  ThemeController.getOne
);

route.post(
  "/create",
  ThemeController.store
);

route.put(
    "/update/:id",
    ThemeController.update
)

route.delete(
    "/:id",
    ThemeController.delete
);

module.exports = route;
