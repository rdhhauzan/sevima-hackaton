'use strict';
const {
  Model
} = require('sequelize');
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
  QuizResult.init({
    userId: DataTypes.INTEGER,
    quizId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuizResult',
  });
  return QuizResult;
};