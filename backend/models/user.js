'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Message)
    }
  };
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    bio: DataTypes.STRING,
    picture: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};