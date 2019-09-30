const assert = require("assert");
const bookControllerFactory = require("../../src/bookController");

describe("Book Controller", function(){
  it("should create or update happy path", async function(){
    const req = {
      body: {
        isbn: "ISBN"
      }
    };

    const res = {
      redirect(path){
        res.redirect.invokedWith = path;
      }
    };

    const bookService = {
      async createOrUpdate(){

      }
    };

    const bookController = bookControllerFactory({bookService});

    await bookController.createOrUpdate(req, res);

    assert.deepStrictEqual(res.redirect.invokedWith, "/book/ISBN");
  })
});
