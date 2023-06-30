const router = require("express").Router();
const { celebrateCreatePosts } = require("../utils/celebrate");
const {
  getAllPosts,
  createPost,
  getPostsById,
} = require("../controllers/post");

router.get("/", getAllPosts);
router.get("/:id", getPostsById);
router.post("/", celebrateCreatePosts, createPost);

module.exports = router;
