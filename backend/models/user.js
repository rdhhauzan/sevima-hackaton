"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Quiz, {
        foreignKey: "creatorId",
      });
      User.hasMany(models.QuizAnswer, {
        foreignKey: "userId",
      });
      User.hasMany(models.QuizResult, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be Null" },
          notNull: { msg: "Name cannot Empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already Taken!" },
        validate: {
          notEmpty: { msg: "Email cannot be Null" },
          notNull: { msg: "Email cannot Empty" },
          isEmail: { msg: "Must Be Email Format!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [7, 100],
          notEmpty: { msg: "Password cannot be Null" },
          notNull: { msg: "Password cannot Empty" },
        },
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          isIn: [[0, 1]],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
