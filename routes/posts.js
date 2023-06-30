const router = require("express").Router();
const { celebrateCreatePosts } = require("../utils/celebrate");
const {
  getAllPosts,
  createPost,
  getPostsById,
  deletePostById,
} = require("../controllers/post");

router.get("/", getAllPosts);
router.get("/:id", getPostsById);
router.post("/", celebrateCreatePosts, createPost);
router.delete("/:id", deletePostById);

module.exports = router;
