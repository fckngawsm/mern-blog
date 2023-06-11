const express = require("express");
const mongoose = require("mongoose");
const { createUser, loginUser, getCurrentUser } = require("./controllers/user");
const { celebrateRegister } = require("./utils/celebrate");
const auth = require("./middlewares/auth");
// mongodb
mongoose.connect("mongodb+srv://kirill:kirill@cluster0.igmc2mb.mongodb.net/");
const app = express();
// позволяет читать json из наших запросов
app.use(express.json());
const { PORT = 4444 } = process.env;

app.get("/", (req, res) => {
  res.send("hello worsdasdassssld");
});
app.post("/auth/signup", celebrateRegister, createUser);
app.post("/auth/signin", loginUser);
app.get("/auth/users/me", auth, getCurrentUser);

app.listen(PORT, () => {
  console.log(`приложение запущено на ${PORT} порту`);
});
