const { RedshiftData } = require("aws-sdk");
const CategoryService = require("../services/CategoryService");
const redis = require("../services/redis");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Category']
         #swagger.description = "Get all categories"
        */
    try {
      const categoriesRedis = await redis.clientGet("categories");
      if (categoriesRedis) {
        const categories = JSON.parse(categoriesRedis);
        // console.log("_______có trong redis nè____");
        // console.log(categories);
        return res.status(200).json({
          status: 200,
          message: "Get list categories from redis successful!",
          data: categories,
        });
      } else {
        let data = await CategoryService.getAll();
        await redis.clientSet("categories",JSON.stringify(data))
        return res.status(200).json({
          status: 200,
          message: "Get list categories successful!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get all categories");
      throw error;
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['Category']
         #swagger.description = "Create new category"
        */
    try {
      const name = req.body.name;
      const idagency = req.body.idagency;
      let data = await CategoryService.createCategory(name, idagency);
      console.log("____Create Category Successful");
      
      let categories = await CategoryService.getAll();
      await redis.clientSet("categories",JSON.stringify(categories))


      return res.status(200).json({
        status: 200,
        message: "Create Category Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Category Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Category']
         #swagger.description = "Delete category"
        */
    try {
      const id = req.params["id"];

      let data = await CategoryService.deleteCategory(id);
      console.log("____Delete Category Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Category Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Category Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Category']
         #swagger.description = "Update a category"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const idagency = req.body.idagency;

      let data = await CategoryService.updateCategory(id, name, idagency);
      console.log("____Update Category Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Category Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Category Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
