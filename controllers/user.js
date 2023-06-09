const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");

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
        return next(new Error("Ошибка валидации"));
      }
      if (err.name === "MongoError" || err.code === 11000) {
        return next(new Error("Почта уже зарегестрирована"));
      }
      return next(err);
    });
};

module.exports = {
    createUser
}
