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
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    idtheme: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};