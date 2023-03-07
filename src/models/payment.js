'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Payment.belongsTo(models.Ordercarts,{foreignKey:'idorder'})
      
    }
  }
  Payment.init({
    idpayment:{
      type: DataTypes.STRING,
      primaryKey: true
    },
    time: DataTypes.STRING,
    paymentmethod: DataTypes.STRING,
    total: DataTypes.DECIMAL,
    idorder: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};