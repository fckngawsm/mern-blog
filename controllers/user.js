const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");

// create user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      Users.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.send({
        data: {
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        },
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Ошибка валидации"));
      }
      if (err.name === "MongoError" || err.code === 11000) {
        return next(new ConflictError("Почта уже зарегестрирована"));
      }
      return next(err);
    });
};
// login user
// const loginUser = (req, res) => {
//   const { email, password } = req.body;
//   return req.
// };
module.exports = {
  createUser,
};
