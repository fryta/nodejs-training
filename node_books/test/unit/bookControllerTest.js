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
  });

  it("create or update unhappy path", async function () {
    // given
    const req = {};
    const res = {};
    const bookService = {
      async createOrUpdate() {
        throw "error";
      }
    };
    const next = function (error) {
      next.invokedWith = error;
    };
    const bookController = bookControllerFactory({bookService});

    // when
    await bookController.createOrUpdate(req, res, next);

    // then
    assert.deepStrictEqual(next.invokedWith, "error");
  });
});
