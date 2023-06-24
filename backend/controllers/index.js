const {
  User,
  Quiz,
  QuizAnswer,
  QuizQuestion,
  QuizResult,
} = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

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
      const quizzes = await Quiz.findAll();
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
}

module.exports = Controller;
