const bookLink = require("./links").bookLink;

module.exports = {
  createOrUpdate({isbn}, res, next){
    return res.redirect(bookLink(isbn));
  },
  list({books, layout}, res, next){
    return res.format({
      "text/html"() {
        res.render("books", {books: books.map(book => ({...book, link: bookLink(book.isbn)})), layout})
      },
      "application/json"() {
        res.json(books);
      },
      "default"() {
        res.json(books);
      }
    });
  },
  details({book, layout}, res, next){
    return book ? res.format({
      "text/html"() {
        res.render("book", {book, layout});
      },
      "application/json"(){
        res.json(book);
      },
      "default"() {
        res.json(book);
      }
    }) : next();
  },
  remove({isbn}, res, next){
    return res.status(204).end();
  }
}