(async function main() {
  const app = await require('./app')();

  app.listen(3001, function () {
    console.log("Listening on port ", 3001);
  });
})();
