module.exports = (db) => {
  const router = require('express').Router();
  const bookControllerFactory = require("./bookController");
  const bookRepository = require("./bookRepository")(db);
  const bookService = require("./bookService")(bookRepository);
  const validateBookMiddleware = require("./validateBookMiddleware");

  const {details, createOrUpdate, remove, getList} = bookControllerFactory({bookService, bookRepository});

  router.post("/book", validateBookMiddleware, createOrUpdate);
  router.get("/book", getList);
  router.get("/book/:isbn", details);
  router.delete("/book/:isbn", remove);

  return router;
};
