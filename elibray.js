const e = require("express");
var express = require("express");

var app = express();

app.use(express.json());

let bookList = [
  {
    id: 1,
    title: "Reactions in React",
    author: "Ben Dover",
    publisher: "Random House",
    isbn: "978-3-16-148410-0",
    avail: true,
  },
  {
    id: 2,
    title: "Express-sions",
    author: "Frieda Livery",
    publisher: "Chaotic House",
    isbn: "978-3-16-148410-2",
    avail: true,
  },
  {
    id: 3,
    title: "Restful REST",
    author: "Al Gorithm",
    publisher: "ACM",
    isbn: "978-3-16-143310-1",
    avail: true,
  },
  {
    id: 4,
    title: "See Essess",
    author: "Anna Log",
    publisher: "O'Reilly",
    isbn: "987-6-54-148220-1",
    avail: false,
    who: "Homer",
    due: "1/1/23",
  },
  {
    id: 5,
    title: "Scripting in JS",
    author: "Dee Gital",
    publisher: "IEEE",
    isbn: "987-6-54-321123-1",
    avail: false,
    who: "Marge",
    due: "1/2/23",
  },
  {
    id: 6,
    title: "Be An HTML Hero",
    author: "Jen Neric",
    publisher: "Coders-R-Us",
    isbn: "987-6-54-321123-2",
    avail: false,
    who: "Lisa",
    due: "1/3/23",
  },
];

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
  bookList.forEach((book) => {
    allBooks.push(book);
  });
  return allBooks;
}

app.get("/books/:id", function (req, res) {
  const bookId = parseInt(req.params.id);
  const book = bookList.find((book) => book.id === bookId);

  if (book) {
    res.json(book);
    console.log(req.params.id);
  } else {
    res.sendStatus(404);
  }
});

app.get("/books", function (req, res) {
  const availParam = req.query.avail;
  if (availParam && availParam.toLowerCase() === "true") {
    const availableBooks = bookList.filter((book) => book.avail === true);
    res.json(availableBooks);
  } 
  else if(availParam && availParam.toLowerCase() === "false"){
    const availableBooks = bookList.filter((book) => book.avail === false);
    res.json(availableBooks);
  }
  else {
    const allBooks = getBooks();
    res.json(allBooks);
  }
});

app.get("/books", function (req, res) {
  const allBooks = getBooks();
  res.json(allBooks);
});

app.post("/books", function(req,res){
  const newBook = req.body;
  
  if (!newBook.id || !newBook.title || !newBook.author || !newBook.publisher || !newBook.isbn || newBook.avail === undefined) {
    return res.status(403).json({ error: "Missing required fields" });
  }
  
  bookList.push(newBook);
  res.status(201).json(newBook);
});


app.delete("/books/:id", function(req, res) {
  const bookId = parseInt(req.params.id);

  if(bookId === 77){
    bookList.pop(bookId)
    res.status(200).send(`Deleted Book with ID: ${bookId}`)
  }
  else{
    res.status(204).send(`Book with ID ${bookId} does not exist.`);
  }
});




app.listen("3000");
