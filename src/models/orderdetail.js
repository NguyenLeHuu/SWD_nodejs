'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderCartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderCartDetail.belongsTo(models.Product,{foreignKey:'idproduct'});
      // OrderCartDetail.belongsTo(models.OrderCart,{foreignKey:'idorder'});
    }
  }
  OrderCartDetail.init({
    idorderdetail: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    idorder: DataTypes.STRING,
    idproduct: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    totalprice: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'OrderCartDetail',
  });
  return OrderCartDetail;
};