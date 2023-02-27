'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.belongsTo(models.Category,{foreignKey:'idproductcategory'})
      // Product.belongsTo(models.Cart,{foreignKey:'idproduct'})
      // Product.hasMany(models.Favorite,{foreignKey:'productId'});
      // Product.hasMany(models.Image,{foreignKey:'productId'});
      // Product.hasMany(models.InvoiceProduct,{foreignKey:'productId'});
    }
  }
  Product.init({
    idproduct:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    idproductcategory: DataTypes.INTEGER,
    idcollection: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};