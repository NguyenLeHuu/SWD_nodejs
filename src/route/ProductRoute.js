const promiseRouter = require("express-promise-router");
const ProductController = require("../controllers/ProductController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require('multer');
let route = promiseRouter();

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

const upload = multer({ dest: "uploads/" });

route.get("/", ProductController.index);

route.get("/:id", ProductController.getOne);

route.post("/create", Multer.array("image"), ProductController.store);

route.put("/update/:id", ProductController.update);

route.delete("/:id", ProductController.delete);
module.exports = route;
