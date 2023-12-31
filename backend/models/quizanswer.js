"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuizAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuizAnswer.belongsTo(models.User, {
        foreignKey: "userId",
      });
      QuizAnswer.belongsTo(models.Quiz, {
        foreignKey: "quizId",
      });
      QuizAnswer.belongsTo(models.QuizQuestion, {
        foreignKey: "questionId",
      });
    }
  }
  QuizAnswer.init(
    {
      userId: DataTypes.INTEGER,
      quizId: DataTypes.INTEGER,
      answer: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "QuizAnswer",
    }
  );
  return QuizAnswer;
};
