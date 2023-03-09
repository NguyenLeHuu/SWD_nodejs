"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderCart.belongsTo(models.Customer, { foreignKey: "idcustomer" });
      OrderCart.hasMany(models.OrderCartDetail, { foreignKey: "idorder" });
    }
  }
  OrderCart.init(
    {
      idorder: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      datetime: DataTypes.DATE,
      totalmoney: DataTypes.DECIMAL,
      idcustomer: DataTypes.STRING,
      idagency: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      tracking: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderCart",
    }
  );
  return OrderCart;
};
