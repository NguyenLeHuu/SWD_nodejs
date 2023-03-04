'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection.belongsTo(models.Theme, {foreignKey: 'idtheme'})
      // Collection.hasMany(models.Product,{foreignKey:'idproductcategory'});
    }
  }
  Collection.init({
    idcollection: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    idtheme: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};