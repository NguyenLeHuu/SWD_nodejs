'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product,{foreignKey:'idproduct'});
      // Image.belongsTo(models.Feedback,{foreignKey:'idfeedback'});
    }
  }
  Image.init({
    idimage: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    idproduct: DataTypes.STRING,
    idfeedback: DataTypes.STRING,
    urlImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};