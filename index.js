const express = require("express");
const mongoose = require("mongoose");
const { upload } = require("./utils/multer");
const { createUser, loginUser } = require("./controllers/user");
const { celebrateRegister } = require("./utils/celebrate");
const routes = require("./routes");
const auth = require("./middlewares/auth");
const sendErr = require("./middlewares/sendErr");
// mongodb
mongoose.connect("mongodb+srv://kirill:kirill@cluster0.igmc2mb.mongodb.net/");
const app = express();
// позволяет читать json из наших запросов
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const { PORT = 4444 } = process.env;
app.get("/", (_, res) => {
  res.send("hello worsdasdassssld");
});
// login and register route
app.post("/auth/signup", celebrateRegister, createUser);
app.post("/auth/signin", loginUser);
app.post("/uploads", auth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.use("/", routes);
app.use(sendErr);
app.listen(PORT, () => {
  console.log(`приложение запущено на ${PORT} порту`);
});
