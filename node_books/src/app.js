const express = require("express");
const app = express();
const bookRoutes = require("./bookRoutes");
const {notFoundError, applicationError} = require("./errors");

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(bookRoutes);

app.use(notFoundError);
app.use(applicationError);

module.exports = app;
