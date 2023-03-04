const ProductService = require("../services/ProductService");
const fcm = require("../services/fcm");
const redis = require("../services/redis");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Get all products"
        */
    try {
      let data = await ProductService.getAll();

      return res.status(200).json({
        status: 200,
        message: "Get list products successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get all products");
      throw error;
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Get one Product"
        */
    try {
      const id = req.params.id;
      let data = await ProductService.getOne(id);

      if(data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get product successful!",
          data: data,
        });
      }else{
        return res.status(400).json({
          status: 400,
          message: "Product not exist!",
          data: data,
        });
      }
      
    } catch (error) {
      console.log("____Cannot get product");
      throw error;
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Create new product"
        */
    try {
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const idproductcategory = req.body.idproductcategory;
      const idcollection = req.body.idcollection;
      let data = await ProductService.createProduct(name,quantity, price,idproductcategory,idcollection);
      console.log("____Create Product Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Product Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Product Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  
  async update(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Update a product"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const status = req.body.status;
      const idproductcategory = req.body.idproductcategory;
      const idcollection = req.body.idcollection;
      
      let data = await ProductService.updateProduct(id, name,quantity, price,status,idproductcategory,idcollection);
      console.log("____Update Product Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Product Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Product Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Delete product"
        */
    try {
      const id = req.params["id"];

      let data = await ProductService.deleteProduct(id);
      console.log("____Delete Product Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Product Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Product Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
