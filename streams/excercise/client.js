const fs = require("fs");
const zlib = require("zlib");
const http = require("http");
const pump = require("pump");

const post = http.request({
  method: "POST",
  host: "localhost",
  port: 3000,
  url: "/"
}, (res) => {
  res.pipe(process.stdout);
});

const onError = (err) => {
  console.log(err);
}

fs.createReadStream("./data/books.import.txt")
  .pipe(zlib.createGzip())
  .pipe(post);

pump(
  fs.createReadStream("./data/books.import.txt"),
  zlib.createGzip(),
  post,
  onError
);