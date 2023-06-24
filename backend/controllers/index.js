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
        role: findUser.role
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
}

module.exports = Controller;
