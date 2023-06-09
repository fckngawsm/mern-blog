const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// mongodb
mongoose.connect("mongodb+srv://kirill:kirill@cluster0.igmc2mb.mongodb.net/");
const app = express();
// позволяет читать json из наших запросов
app.use(express.json());
const { PORT = 4444 } = process.env;

app.get("/", (req, res) => {
  res.send("hello worsdasdassssld");
});
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign(
    {
      email,
    },
    "secret-key"
  );
  res.json({ succes: true, token });
});

app.listen(PORT, () => {
  console.log(`приложение запущено на ${PORT} порту`);
});
