"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quiz.belongsTo(models.User, {
        foreignKey: "creatorId",
      });
      Quiz.hasMany(models.QuizQuestion, {
        foreignKey: "quizId",
      });
      Quiz.hasMany(models.QuizAnswer, {
        foreignKey: "quizId",
      });
      Quiz.hasMany(models.QuizResult, {
        foreignKey: "quizId",
      });
    }
  }
  Quiz.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name field is required",
          },
          len: {
            args: [3, 255],
            msg: "Name must be between 3 and 255 characters",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description field is required",
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Duration must be an integer",
          },
          min: {
            args: [1],
            msg: "Duration must be greater than or equal to 1",
          },
        },
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Creator ID must be an integer",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Quiz",
    }
  );
  return Quiz;
};
