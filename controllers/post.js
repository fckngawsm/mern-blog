const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const Posts = require("../models/post");

// get all posts
const getAllPosts = (_, res, next) => {
  Posts.find({})
    .populate("author")
    .exec()
    .then((post) => res.send(post))
    .catch(next);
};

// get posts by id
const getPostsById = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Posts.findByIdAndUpdate(
    { _id: id },
    { $inc: { viewsCount: 1 } },
    { new: true }
  )
    .then((post) => res.send({ data: post }))
    .catch((err) => {
      if (err) {
        console.log(err);
        return next(new BadRequestError("Пост не найден"));
      }
      if (!doc) {
        return next(new NotFoundError("Указанного id не существует"));
      }
    });
};

// create posts
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

// delete by id

const deletePostById = (req, res, next) => {
  const { id } = req.params;
  Posts.findByIdAndDelete({ _id: id })
    .then((post) => res.send({ data: post }))
    .catch((err) => {
      if (err) {
        console.log(err);
        return next(new BadRequestError("Пост не найден"));
      }
      if (!doc) {
        return next(new NotFoundError("Указанного id не существует"));
      }
    });
};

module.exports = {
  getAllPosts,
  createPost,
  getPostsById,
  deletePostById
};
