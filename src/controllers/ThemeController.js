const ThemeService = require("../services/ThemeService");
const redis = require("../services/redis");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Theme']
         #swagger.description = "Get all themes"
        */
    try {
      const idcreator = req.query.idcreator;
      if (idcreator) {
        let result = await ThemeService.getThemeOfCreator(idcreator);
        return res.status(200).json({
          status: 200,
          message: "Get list themes successful!",
          data: result,
        });
      } else {
        let data = await ThemeService.getAll();
        return res.status(200).json({
          status: 200,
          message: "Get list themes successful!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get all themes");
      throw error;
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Theme']
         #swagger.description = "Get one theme"
        */
    try {
      const id = req.params.id;
      let data = await ThemeService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get theme successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Theme not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get theme");
      throw error;
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['Theme']
         #swagger.description = "Create new theme"
        */
    try {
      const name = req.body.name;
      const idcreator = req.body.idcreator;
      let data = await ThemeService.createTheme(name, idcreator);
      console.log("____Create Theme Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Theme Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Theme Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Theme']
         #swagger.description = "Delete theme"
        */
    try {
      const id = req.params["id"];

      let data = await ThemeService.deleteTheme(id);
      console.log("____Delete Theme Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Theme Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Theme Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Theme']
         #swagger.description = "Update a theme"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;

      let data = await ThemeService.updateTheme(id, name);
      console.log("____Update Theme Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Theme Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Theme Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
