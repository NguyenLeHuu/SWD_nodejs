"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Theme.belongsTo(models.Creator, { foreignKey: "idcreator" });
      Theme.hasMany(models.Collection, { foreignKey: "idtheme" });
    }
  }
  Theme.init(
    {
      idtheme: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      idcreator: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Theme",
    }
  );
  return Theme;
};
