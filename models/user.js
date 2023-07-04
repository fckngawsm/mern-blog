const mongoose = require("mongoose");
const UnathorizationError = require("../errors/unathorization-error");
const bcrypt = require("bcryptjs/dist/bcrypt");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 40,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_640.png",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnathorizationError("Неправильные email или пароль")
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnathorizationError("Неправильные email или пароль")
          );
        }
        return user;
      });
    });
};
module.exports = mongoose.model("user", UserSchema);
