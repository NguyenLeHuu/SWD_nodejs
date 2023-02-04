
const express = require("express");

const apiRoute = express();

const productRouter = require("./product.routes") ;

apiRoute.use("/product", productRouter);

module.exports= apiRoute;