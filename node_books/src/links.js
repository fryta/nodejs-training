const links = {
  resources: {
    BOOK: "/book",
    BOOK_COLLECTION: "/book/:isbn"
  },
    bookLink(isbn) {
    return links.resources.BOOK_COLLECTION.replace(":isbn", isbn);
  }
};

module.exports = links;