"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuizQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuizQuestion.belongsTo(models.Quiz, {
        foreignKey: "quizId",
      });
      QuizQuestion.hasMany(models.QuizAnswer, {
        foreignKey: "questionId",
      });
    }
  }
  QuizQuestion.init(
    {
      quizId: DataTypes.INTEGER,
      question: DataTypes.STRING,
      correct_answer: DataTypes.STRING,
      choice_1: DataTypes.STRING,
      choice_2: DataTypes.STRING,
      choice_3: DataTypes.STRING,
      choice_4: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "QuizQuestion",
    }
  );
  return QuizQuestion;
};
