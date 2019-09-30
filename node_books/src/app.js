const express = require("express");
const app = express();

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/booksapi';

function middleware(req, res, next){
  console.log("new request at " + new Date());
  next();
}

function auth(req, res, next){
  console.log("auth");
  next();
}

app.use(express.json());
app.use(middleware);
app.use(auth);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/book", function(req, res) {
  const {title, authors, isbn, description} = req.body;
  MongoClient.connect(url, function(err, client) {
    client.db().collection("books").updateOne(
      {isbn: isbn},
      { $set: {title, authors, isbn, description} },
      {upsert: true}
    );

    client.close();
  });

  res.json({title, authors, isbn, description});
});

app.get("/book/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  MongoClient.connect(url, function(err, client) {
    client.db().collection("books").findOne({isbn}, {projection: {_id: false}}, function(err, book) {
      res.json(book);
    });

    client.close();
  });
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
