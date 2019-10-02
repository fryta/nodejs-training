module.exports = (db) => {
  const express = require("express");
  const app = express();
  const bookRoutes = require("./book/bookRoutes")(db);
  const {notFoundError, applicationError} = require("./errors");
  const {trackRequestTime} = require("./middlewares");
  const path = require("path");

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  app.use(express.json());

  app.use(trackRequestTime);

  app.get("/", function (req, res) {
    res.send("Hello World!");
  });

  app.use(bookRoutes);

  app.use(notFoundError);
  app.use(applicationError);

  return app;
};
