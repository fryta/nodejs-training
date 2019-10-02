const http = require("http");
const zlib = require("zlib");
const split = require("split2");
const through = require("through2");

function parseToJson(string, encoding, next) {
  next(null, JSON.parse(string));
}

function extractTitle(obj, encoding, next) {
  next(null, obj['title']);
}

function filterJavascript(title, encoding, next) {
  if(title.match(/javascript/gi)){
    this.push(title);
  }
  next();
}

function buildJson(title, encoding, next) {
  next(null, `${JSON.stringify({"title": title})}\r\n`);
}

const server = http.createServer((req, res) => {
  if(req.method === "POST") {
    req.pipe(zlib.createGunzip())
      .pipe(split())
      .pipe(through.obj(parseToJson))
      .pipe(through.obj(extractTitle))
      .pipe(through.obj(filterJavascript))
      .pipe(through.obj(buildJson))
      .pipe(res);
  }
});

server.listen(3000);
