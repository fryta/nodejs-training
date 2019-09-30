const express = require("express");
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/booksapi';

let booksPromise = MongoClient.connect(url).then(function(client){
  return client.db().collection("books");
});

function middleware(req, res, next){
  next();
}

function auth(req, res, next){
  next();
}

app.use(express.json());
app.use(middleware);
app.use(auth);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/book", function(req, res, next) {
  const {title, authors, isbn, description} = req.body;
  booksPromise
    .then(function(books){
      return books.updateOne(
        {isbn: isbn},
        { $set: {title, authors, isbn, description} },
        {upsert: true}
      );
    })
    .then(function(){
      return res.json({title, authors, isbn, description});
    })
    .catch(next);
});

app.get("/book/:isbn", function (req, res, next) {
  const isbn = req.params.isbn;
  booksPromise
    .then(function(books){
      return books.findOne({isbn}, {projection: {_id: false}});
    })
    .then(function(err, book){
      return res.json(book);
    })
    .catch(next);
});

app.use(function clientError(req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({message: err.message, error: err.stack});
});

module.exports = app;
