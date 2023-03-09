const promiseRouter = require("express-promise-router");
const CollectionController = require("../controllers/CollectionController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require('multer');
let route = promiseRouter();

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

route.get("/", CollectionController.index);

route.get("/:id", CollectionController.getOne);

route.post("/create", Multer.single("image"), CollectionController.store);

route.put("/update/:id", CollectionController.update);

route.delete("/:id", CollectionController.delete);

module.exports = route;
