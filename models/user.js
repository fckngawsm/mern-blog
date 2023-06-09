const mongoose = require("mongoose");
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

module.exports = mongoose.model('user', UserSchema);

