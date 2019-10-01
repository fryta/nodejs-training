module.exports = () => {
  const books = {};

  return {
    async createOrUpdate(book) {
      books[book.isbn] = book;
    },
    async details(isbn) {
      return books[isbn];
    },
    async delete(isbn) {
      delete books[isbn];
    }
  };
};
