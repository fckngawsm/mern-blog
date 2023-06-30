const router = require("express").Router();
const {
  celebrateCreatePosts,
  celebrateUpdatePost,
} = require("../utils/celebrate");
const {
  getAllPosts,
  createPost,
  getPostsById,
  deletePostById,
  updatePost,
} = require("../controllers/post");
const auth = require("../middlewares/auth");

router.get("/", getAllPosts);
router.get("/:id", getPostsById);
// where need auth
router.use("/", auth);
router.post("/", celebrateCreatePosts, createPost);
router.delete("/:id", deletePostById);
router.patch("/:id", celebrateUpdatePost, updatePost);

module.exports = router;
