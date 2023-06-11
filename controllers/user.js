const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");

// create user
const createUser = (req, res, next) => {
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
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign({ userId }, "secret-key", {
          expiresIn: "7d",
        });

        return res.send({ _id: token });
      }

      throw new UnauthorizedError("Неправильные почта или пароль");
    })
    .catch(next);
};
// current user
const getCurrentUser = (req, res, next) => {
  const { userId } = req.user;
  Users.findById(userId)
    .then((user) => {
      if (!user) {
        throw new BadRequestError("Такого пользователя не сущесвует");
      }
      return res.json({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
};
