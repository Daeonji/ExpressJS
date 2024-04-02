var express = require("express");

var app = express();

var bookList = new Map();
bookList.set("1", {
  title: "Reactions in React",
  author: "Ben Dover",
  publisher: "Random House",
  isbn: "978-3-16-148410-0",
  avail: "true",
});
bookList.set("2", {
  title: "Express-sions",
  author: "Frieda Livery",
  publisher: "Chaotic House",
  isbn: "978-3-16-148410-2",
  avail: "true",
});
bookList.set("3", {
  title: "Restful REST",
  author: "Al Gorithm",
  publisher: "ACM",
  isbn: "978-3-16-143310-1",
  avail: "true",
});
bookList.set("4", {
  title: "See Essess",
  author: "Anna Log",
  publisher: "O'Reilly",
  isbn: "987-6-54-148220-1",
  avail: "false",
  who: "Homer",
  due: "1/1/23",
});
bookList.set("5", {
  title: "Scripting in JS",
  author: "Dee Gital",
  publisher: "IEEE",
  isbn: "987-6-54-321123-1",
  avail: "false",
  who: "Marge",
  due: "1/2/23",
});
bookList.set("6", {
  title: "Be An HTML Hero",
  author: "Jen Neric",
  publisher: "Coders-R-Us",
  isbn: "987-6-54-321123-2",
  avail: "false",
  who: "Lisa",
  due: "1/3/23",
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

function getBooks() {
  const allBooks = [];
  bookList.forEach((book, id) => {
    allBooks.push({ id, book });
  });
  return allBooks;
}

app.get("/books/:id", function (req, res) {
  if (bookList.has(req.params.id)) {
    res.json(bookList.get(req.params.id));
    console.log(req.params.id);
  } else {
    res.sendStatus(404);
  }
});

app.get("/books", function (req, res) {
  const allBooks = getBooks();
  res.json(allBooks);
});

app.listen("3000");
