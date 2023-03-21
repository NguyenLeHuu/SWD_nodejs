"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Creator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Creator.hasOne(models.Cart,{foreignKey:'CreatorId'});
      // Creator.hasMany(models.Favorite,{foreignKey:'CreatorId'});
      Creator.hasMany(models.Theme, { foreignKey: "idcreator" });
      Creator.belongsTo(models.Agency, { foreignKey: "idagency" });
    }
  }
  Creator.init(
    {
      idcreator: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      idagency: DataTypes.STRING,
      email: DataTypes.STRING,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Creator",
      timestamps: false,
    }
  );
  return Creator;
};
