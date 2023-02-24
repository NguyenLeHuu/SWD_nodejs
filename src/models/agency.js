'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cart.belongsTo(models.User,{foreignKey:'userId',targetKey:'id',as:'usercart'})
      // Cart.belongsTo(models.User,{foreignKey:'userId'})
      // Cart.belongsTo(models.Product,{foreignKey:'productId'})
    }
  }
  Agency.init({
    idagency:{
      type: DataTypes.INTEGER,
      primaryKey: true,
    }, 
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Agency',
    timestamps: false,
  });
  return Agency;
};