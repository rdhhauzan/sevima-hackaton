const { User } = require("../models/index");

const adminAuthorization = async (req, res, next) => {
  try {
    // console.log(req.user);
    const { id, role } = req.user;
    console.log(req.user);
    // console.log(role.toUpperCase());
    const findUser = await User.findByPk(id);

    if (findUser) {
      if (role === 0) {
        next();
      } else {
        throw { message: "Unauthorized" };
      }
    }

    if (!findUser) {
      throw { message: "DATA_NOT_FOUND" };
    }
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(403).json(error);
  }
};

module.exports = adminAuthorization;
