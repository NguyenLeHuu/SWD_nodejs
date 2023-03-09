const promiseRouter = require("express-promise-router");
const CollectionController = require("../controllers/CollectionController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();


route.get("/", CollectionController.index);

route.get("/:id", CollectionController.getOne);

route.post("/create", multer.Multer.single("image"), CollectionController.store);

route.put("/update/:id", CollectionController.update);

route.delete("/:id", CollectionController.delete);

module.exports = route;
