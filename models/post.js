const mongoose = require("mongoose");
const PostsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
      required: true,
    },
    description: {
      type: String,
      minlength: 2,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    image: {
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
module.exports = mongoose.model("posts", PostsSchema);
