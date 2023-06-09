const express = require("express");

const app = express();

const { PORT = 4444 } = process.env;

app.get("/", (req, res) => {
  res.send("hello worsdasdassssld");
});

app.listen(PORT, () => {
  console.log(`приложение запущено на ${PORT} порту`);
});
