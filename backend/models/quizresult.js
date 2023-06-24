"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuizResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuizResult.belongsTo(models.User, {
        foreignKey: "userId",
      });
      QuizResult.belongsTo(models.Quiz, {
        foreignKey: "quizId",
      });
    }
  }
  QuizResult.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "User ID must be an integer",
          },
        },
      },
      quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Quiz ID must be an integer",
          },
        },
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Score must be an integer",
          },
          min: {
            args: [0],
            msg: "Score cannot be negative",
          },
          max: {
            args: [100],
            msg: "Score cannot exceed 100",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "QuizResult",
    }
  );
  return QuizResult;
};
