'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Agency, {foreignKey: 'idagency'})
      Category.hasMany(models.Product,{foreignKey:'idproductcategory'});
    }
  }
  Category.init({
    idproductcategory: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    idagency: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};