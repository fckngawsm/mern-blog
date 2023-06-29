const router = require("express").Router();
const { celebrateCreatePosts } = require("../utils/celebrate");
const { getAllPosts, createPost } = require("../controllers/post");

router.get("/", getAllPosts);
router.post("/", celebrateCreatePosts, createPost);

module.exports = router;
