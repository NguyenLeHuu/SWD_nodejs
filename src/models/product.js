"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "idproductcategory" });
      Product.belongsTo(models.Collection, { foreignKey: "idcollection" });
      Product.hasMany(models.OrderCartDetail, { foreignKey: "idproduct" });
      Product.hasMany(models.Image, { foreignKey: "idproduct" });
    }
  }
  Product.init(
    {
      idproduct: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      idproductcategory: DataTypes.STRING,
      idcollection: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
