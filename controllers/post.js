const BadRequestError = require("../errors/bad-request-error");
const Posts = require("../models/post");

// get all posts
const getAllPosts = (_, res, next) => {
  Posts.find({})
    .then((post) => res.send(post))
    .catch(next);
};

const createPost = (req, res, next) => {
  const { title, description, tags, image } = req.body;
  Posts.create({ title, description, tags, image, author: req.user.userId })
    .then((post) => res.send({ data: post }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Ошибка валидации!"));
      }
      return next(err);
    });
};

module.exports = {
  getAllPosts,
  createPost,
};
