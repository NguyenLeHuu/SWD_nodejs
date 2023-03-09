const ProductService = require("../services/ProductService");
const Firebase = require("../services/Firebase");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Filter product, required idcollection"
        */
    try {
      const {idcollection, limit, page, name, category, status, min, max } = req.query;
      let products = await ProductService.getAll(req.query);

      return res.status(200).json({
        status: 200,
        message: "Get list products successful!",
        data: products,
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

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get product successful!",
          data: data,
        });
      } else {
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
    // #swagger.tags = ['Product']
    /*
          #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'false',
        } */
    try {
      const { name, quantity, price, idproductcategory, idcollection } =
        req.body;
      let image =
        "https://cdn.softaz.vn/data/Product/EE462004-D30A-452B-9FDF-C58298FADF6F/Gi%C3%A0y%20th%E1%BB%83%20thao%20Tiempo%20xanh%20B%20(1).jpg?h=270";
      if (req.file) {
        image = await Firebase.uploadImage(req.file);
      }
      let data = await ProductService.createProduct(req.body, image);
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

      let data = await ProductService.updateProduct(id, name, quantity, price);
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
