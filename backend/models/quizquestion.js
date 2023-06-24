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
      quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Quiz ID must be an integer",
          },
        },
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Question is required",
          },
        },
      },
      correct_answer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Correct answer is required",
          },
        },
      },
      choice_1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Choice 1 is required",
          },
        },
      },
      choice_2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Choice 2 is required",
          },
        },
      },
      choice_3: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Choice 3 is required",
          },
        },
      },
      choice_4: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Choice 4 is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "QuizQuestion",
    }
  );
  return QuizQuestion;
};
