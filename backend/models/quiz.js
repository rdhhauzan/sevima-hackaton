'use strict';
const {
  Model
} = require('sequelize');
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
  Quiz.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};