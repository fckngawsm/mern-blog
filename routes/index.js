const routes = require("express").Router();

const posts = require("./posts");
const users = require("./user")
routes.use("/users" , users);
routes.use("/posts", posts);

module.exports = routes;
