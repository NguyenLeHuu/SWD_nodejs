const promiseRouter = require("express-promise-router");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const ImageController = require("../controllers/ImageController");

let route = promiseRouter();

route.use(bodyParser.json());
route.use(fileUpload({}));

route.get("/", ImageController.index);
route.post("/create", ImageController.create);
route.put("/update/:id", ImageController.update);
route.delete("/delete/:id", ImageController.delete);

module.exports = route;
