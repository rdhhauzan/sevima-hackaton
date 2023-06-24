"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("QuizQuestions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quizId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Quizzes",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      question: {
        type: Sequelize.STRING,
      },
      correct_answer: {
        type: Sequelize.INTEGER,
      },
      choice_1: {
        type: Sequelize.STRING,
      },
      choice_2: {
        type: Sequelize.STRING,
      },
      choice_3: {
        type: Sequelize.STRING,
      },
      choice_4: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("QuizQuestions");
  },
};
