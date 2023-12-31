const {
  User,
  Quiz,
  QuizAnswer,
  QuizQuestion,
  QuizResult,
  sequelize,
} = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Op, literal } = require("sequelize");

class Controller {
  static async RegisterUser(req, res) {
    let { name, email, password, role } = req.body;
    try {
      let data = await User.create({
        name,
        email,
        password,
        role,
      });

      res.status(201).json({ msg: "Register Success!" });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  static async loginUser(req, res) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw { name: "LOGIN_ERROR" };
      }

      let findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        throw { name: "INVALID_DATA" };
      }

      let validateUser = comparePassword(password, findUser.password);

      if (!validateUser) {
        throw { name: "INVALID_DATA" };
      }

      let payload = {
        id: findUser.id,
        email: findUser.email,
        name: findUser.name,
        role: findUser.role,
      };

      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        id: findUser.id,
        email: findUser.email,
        role: findUser.role,
        name: findUser.name,
      });
    } catch (error) {
      if (error.name == "LOGIN_ERROR") {
        res.status(403).json({
          msg: "Please Fill All Fields!",
        });
      } else if (error.name == "INVALID_DATA") {
        res.status(403).json({
          msg: "Invalid Username / Password",
        });
      }
      console.log(error);
    }
  }

  // ! Start Admin Section
  static async adminShowQuiz(req, res) {
    try {
      const quizzes = await Quiz.findAll({
        include: [
          {
            model: User,
            as: "User",
            attributes: ["id", "name"],
          },
          {
            model: QuizQuestion,
            as: "QuizQuestions",
            attributes: [],
            include: [
              {
                model: Quiz,
                as: "Quiz",
                attributes: [],
              },
            ],
          },
        ],
        attributes: {
          exclude: ["creatorId"],
          include: [
            [
              sequelize.fn("count", sequelize.col("QuizQuestions.Quiz.id")),
              "totalQuestions",
            ],
          ],
        },
        group: ["Quiz.id", "User.id", "QuizQuestions.Quiz.id"],
      });

      res.json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async adminAddQuiz(req, res) {
    try {
      const { name, description, duration } = req.body;

      // Create the quiz
      const quiz = await Quiz.create({
        name,
        description,
        duration,
        creatorId: req.user.id,
      });

      res.status(201).json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async adminShowSpecificQuiz(req, res) {
    try {
      const { id } = req.params;

      // Find the quiz by ID
      const quiz = await Quiz.findByPk(id);

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async editQuiz(req, res) {
    try {
      const { id } = req.params;
      const { name, description, duration } = req.body;

      // Update the quiz details
      const [updatedRows] = await Quiz.update(
        {
          name,
          description,
          duration,
        },
        {
          where: { id },
        }
      );

      if (updatedRows === 0) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      // Fetch the updated quiz
      const updatedQuiz = await Quiz.findByPk(id);

      res.json(updatedQuiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteQuiz(req, res) {
    try {
      const { id } = req.params;

      // Find the quiz by ID
      const quiz = await Quiz.findByPk(id);

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      // Delete the quiz
      await quiz.destroy();

      res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getQuestionForSpecificQuiz(req, res) {
    try {
      const { quizId } = req.params;

      // Find the quiz by ID and include its associated questions
      const quiz = await Quiz.findByPk(quizId, {
        include: {
          model: QuizQuestion,
          as: "QuizQuestions",
        },
      });

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async addQuestionForSpecificQuiz(req, res) {
    try {
      const { quizId } = req.params;
      const {
        question,
        correct_answer,
        choice_1,
        choice_2,
        choice_3,
        choice_4,
      } = req.body;

      // Find the quiz by ID
      const quiz = await Quiz.findByPk(quizId);

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      // Create the new question
      const newQuestion = await QuizQuestion.create({
        quizId,
        question,
        correct_answer,
        choice_1,
        choice_2,
        choice_3,
        choice_4,
      });

      res.status(201).json({
        message: "Question added successfully",
        question: newQuestion,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getSpecificQuestioninSpecificQuiz(req, res) {
    try {
      const { quizId, questionId } = req.params;

      // Find the question by ID and associated quiz
      const question = await QuizQuestion.findOne({
        where: { id: questionId, quizId },
      });

      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async editSpecificQuestioninSpecificQuiz(req, res) {
    try {
      const { quizId, questionId } = req.params;
      const {
        question,
        correct_answer,
        choice_1,
        choice_2,
        choice_3,
        choice_4,
      } = req.body;

      // Update the question details
      const [numAffectedRows, affectedRows] = await QuizQuestion.update(
        {
          question,
          correct_answer,
          choice_1,
          choice_2,
          choice_3,
          choice_4,
        },
        {
          where: {
            id: questionId,
            quizId,
          },
          returning: true, // Return the updated question
        }
      );

      if (numAffectedRows === 0) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.json({
        message: "Question updated successfully",
        question: affectedRows[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteSpecificQuestioninSpecificQuiz(req, res) {
    try {
      const { quizId, questionId } = req.params;

      // Delete the question
      const numAffectedRows = await QuizQuestion.destroy({
        where: { id: questionId, quizId },
      });

      if (numAffectedRows === 0) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async adminGetAllUsers(req, res) {
    try {
      // Find all users
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getSpecificUser(req, res) {
    try {
      const { id } = req.params;

      // Find the user by id
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the user's quiz results and include the Quiz model to retrieve the quiz details
      const quizResults = await QuizResult.findAll({
        where: { userId: id },
        include: {
          model: Quiz,
          attributes: ["name"],
        },
        attributes: ["score"],
      });

      const userDetails = {
        id: user.id,
        name: user.name,
        scores: quizResults.map((result) => ({
          score: result.score,
          quizName: result.Quiz.name,
        })),
      };

      res.json(userDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllQuizzesAverageScore(req, res) {
    try {
      const averageScore = await QuizResult.findOne({
        attributes: [
          [
            sequelize.fn(
              "ROUND",
              sequelize.fn("AVG", sequelize.col("score")),
              1
            ),
            "averageScore",
          ],
        ],
      });

      res.json({ averageScore: averageScore.dataValues.averageScore });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async showQuiz(req, res) {
    try {
      // Find all quizzes and include the associated user with specific attributes
      const quizzes = await Quiz.findAll({
        include: [
          {
            model: User,
            as: "User",
            attributes: ["id", "name"],
          },
          {
            model: QuizQuestion,
            as: "QuizQuestions",
            attributes: [],
            include: [
              {
                model: Quiz,
                as: "Quiz",
                attributes: [],
              },
            ],
          },
        ],
        attributes: {
          exclude: ["creatorId"],
          include: [
            [
              sequelize.fn("count", sequelize.col("QuizQuestions.Quiz.id")),
              "totalQuestions",
            ],
          ],
        },
        group: ["Quiz.id", "User.id", "QuizQuestions.Quiz.id"],
      });

      res.json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async showSpecificQuiz(req, res) {
    try {
      const { id } = req.params;

      // Find the quiz by id
      const quiz = await Quiz.findByPk(id);

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getQuestionBySpecificQuiz(req, res) {
    try {
      const { id } = req.params;

      // Find the quiz by id
      const quiz = await Quiz.findByPk(id, {
        include: {
          model: QuizQuestion,
        },
        order: [[QuizQuestion, "id", "ASC"]], // Order the questions by their IDs
      });

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      const questions = quiz.QuizQuestions.map((question) => ({
        id: question.id,
        question: question.question,
        choices: [
          question.choice_1,
          question.choice_2,
          question.choice_3,
          question.choice_4,
        ],
      }));

      res.json({ questions: questions, duration: quiz.duration });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async calculateTheScore(req, res) {
    try {
      const quizId = req.params.quizId;
      const answers = req.body.answers; // An array of objects containing question IDs and user answers

      // Retrieve the quiz and its questions
      const quiz = await Quiz.findByPk(quizId, { include: QuizQuestion });
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      // Validate the provided answers
      if (!Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ error: "Invalid answers provided" });
      }

      // Calculate the score
      const maxScore = 100; // Maximum score for the quiz
      const totalQuestions = quiz.QuizQuestions.length; // Total number of questions in the quiz
      let correctAnswers = 0;

      for (const answer of answers) {
        const question = quiz.QuizQuestions.find(
          (q) => q.id == answer.questionId
        );
        if (!question) {
          continue; // Skip if the question is not found in the quiz
        }
        if (question.correct_answer == answer.userAnswer) {
          correctAnswers++;
        }
      }

      const score = (correctAnswers / totalQuestions) * maxScore;

      // Save the quiz result
      const userId = req.user.id; // obtained the user ID
      const quizResult = await QuizResult.create({
        userId,
        quizId,
        score,
      });

      res.status(201).json({ score: quizResult.score });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  static async userProfile(req, res) {
    try {
      const userId = req.user.id;

      // Retrieve the user's profile
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Retrieve the user's quiz results
      const quizResults = await QuizResult.findAll({
        where: { userId },
        include: [
          {
            model: Quiz,
            attributes: ["name", "id"],
          },
        ],
      });

      const formattedResults = quizResults.map((result) => ({
        quizName: result.Quiz.name,
        quizId: result.Quiz.id,
        score: result.score,
      }));

      const userProfile = {
        id: user.id,
        name: user.name,
        profile: user.profile,
        quizResults: formattedResults,
      };

      res.status(200).json({ userProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
}

module.exports = Controller;
