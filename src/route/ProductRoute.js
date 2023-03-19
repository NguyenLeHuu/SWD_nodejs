const promiseRouter = require("express-promise-router");
const ProductController = require("../controllers/ProductController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", ProductController.index);

route.get("/:id", ProductController.getOne);

route.post("/create",multer.Multer.array("image"), ProductController.store);
// route.post("/create",multer.Multer.single("image"), ProductController.store);

route.put("/update/:id", ProductController.update);

route.delete("/:id", ProductController.delete);
module.exports = route;
