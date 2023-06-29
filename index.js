const express = require("express");
const mongoose = require("mongoose");
const { createUser, loginUser } = require("./controllers/user");
const { celebrateRegister } = require("./utils/celebrate");
const auth = require("./middlewares/auth");
const routes = require("./routes");
// mongodb
mongoose.connect("mongodb+srv://kirill:kirill@cluster0.igmc2mb.mongodb.net/");
const app = express();
// позволяет читать json из наших запросов
app.use(express.json());
const { PORT = 4444 } = process.env;
app.get("/", (_, res) => {
  res.send("hello worsdasdassssld");
});
// login and register route
app.post("/auth/signup", celebrateRegister, createUser);
app.post("/auth/signin", loginUser);
// where need auth
app.use("/", auth, routes);
app.listen(PORT, () => {
  console.log(`приложение запущено на ${PORT} порту`);
});
