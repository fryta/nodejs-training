const fs = require("fs");
const zlib = require("zlib");
const http = require("http");

const post = http.request({
  method: "POST",
  host: "localhost",
  port: 3000,
  url: "/"
}, (res) => {
  res.pipe(process.stdout);
});

fs.createReadStream("./data/books.import.txt")
  .pipe(zlib.createGzip())
  .pipe(post);
