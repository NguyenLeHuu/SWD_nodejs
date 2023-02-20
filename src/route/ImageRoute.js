const promiseRouter = require("express-promise-router");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const ImageController = require("../controllers/ImageController");

let route = promiseRouter();

route.use(bodyParser.json());
route.use(fileUpload({}));

route.post("/", ImageController.create);

module.exports = route;
