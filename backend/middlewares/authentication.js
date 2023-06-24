const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    // console.log(req.headers);
    if (!access_token) {
      throw {
        message: "You are not authorized",
      };
    }

    const validateToken = verifyToken(access_token);
    if (!validateToken) {
      throw {
        message: "Invalid token",
      };
    }

    const getUser = await User.findByPk(validateToken.id);
    if (!getUser) {
      throw {
        message: "You are not authorized",
      };
    }

    req.user = {
      id: validateToken.id,
      name: validateToken.name,
      email: validateToken.email,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};

module.exports = authentication;
