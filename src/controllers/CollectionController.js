const CollectionService = require("../services/CollectionService");
const fcm = require("../services/fcm");
const redis = require("../services/redis");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Collection']
         #swagger.description = "Get all collections"
        */
    try {
      const idtheme = req.query.idtheme;
      if (idtheme) {
        let result = await CollectionService.getCollectionsOfTheme(idtheme);
        return res.status(200).json({
          status: 200,
          message: "Get list collections successful!",
          data: result,
        });
      } else {
        let data = await CollectionService.getAll();
        return res.status(200).json({
          status: 200,
          message: "Get list collections successful!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get all collections");
      throw error;
    }
  },
  async getOne(req, res) {
    /* 
        #swagger.tags = ['Collection']
         #swagger.description = "Get one collections"
        */
    try {
      const id = req.params.id;
      let data = await CollectionService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get collection successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Collection not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get collection");
      throw error;
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['Collection']
         #swagger.description = "Create new collection"
        */
    try {
      const name = req.body.name;
      const idtheme = req.body.idtheme;
      let data = await CollectionService.createCollection(name, idtheme);
      console.log("____Create Collection Successful");

      // let collections = await CategoryService.getAll();
      // await redis.clientSet("collections", JSON.stringify(collections));

      return res.status(200).json({
        status: 200,
        message: "Create Collection Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Collection Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Collection']
         #swagger.description = "Delete collection"
        */
    try {
      const id = req.params["id"];

      let data = await CollectionService.deleteCollection(id);
      console.log("____Delete Collection Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Collection Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Collection Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Collection']
         #swagger.description = "Update a collection"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;

      let data = await CollectionService.updateCollection(id, name);
      console.log("____Update Collection Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Collection Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Collection Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
