const {BOOK, BOOK_COLLECTION} = require("./links").resources;

module.exports = (db) => {
  const router = require('express').Router();
  const bookControllerFactory = require("./bookController");
  const bookRepository = require("./bookRepository")(db);
  const bookService = require("./bookService")(bookRepository);
  const validateBookMiddleware = require("./validateBookMiddleware");

  const {details, createOrUpdate, remove, getList} = bookControllerFactory({bookService, bookRepository});

  router.post(BOOK, validateBookMiddleware, createOrUpdate);
  router.get(BOOK, getList);
  router.get(BOOK_COLLECTION, details);
  router.delete(BOOK_COLLECTION, remove);

  return router;
};
