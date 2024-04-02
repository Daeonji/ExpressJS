//Hello World

var express = require("express");

var app = express();

app.get("/", function (req, res) {
  res.json("Welcome to Rickster's library book REST server");
});

app.get("/books", function (req, res) {
  res.send("Welcome to the book page");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization, Content-Length, X-Requested-With"
  );
  res.header("Cache-Control", "no-store");
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

app.listen(3000);
console.log("Listening");
