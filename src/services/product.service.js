const ProductModel = require("../models/product.model");
const ProductService = {};

ProductService.getAllProducts = async () => {
   return await ProductModel.find({});
};