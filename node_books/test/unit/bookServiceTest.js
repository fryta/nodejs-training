const bookServiceFactory = require("../../src/bookService");
const bookRepositoryFactory = require("../../src/inMemoryBookRepository");
const assert = require("assert");

describe("Book service", function() {
  it("can create a book", async function() {
    // given
    const bookRepository = bookRepositoryFactory();
    const bookService = bookServiceFactory(bookRepository);
    const book = {title: "the title", authors: [], isbn: "0123456789", description: "desc"};

    // when
    await bookService.createOrUpdate(book);

    // then
    const bookFromDb = await bookRepository.details("0123456789");
    assert.deepStrictEqual(bookFromDb, {slug: "the-title", ...book});
  });
});
