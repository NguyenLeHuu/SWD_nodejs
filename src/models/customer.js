'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Customer.hasOne(models.Cart,{foreignKey:'CustomerId'});
      // Customer.hasMany(models.Favorite,{foreignKey:'CustomerId'});
      // Customer.hasMany(models.Invoice,{foreignKey:'CustomerId'});

    }
  }
  Customer.init({
    idcustomer:{
      type: DataTypes.INTEGER,
      primaryKey: true,
    }, 
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: false,
  });
  return Customer;
};