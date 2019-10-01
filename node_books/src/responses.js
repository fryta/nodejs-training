module.exports = {
  createOrUpdate({isbn}, res, next){
    return res.redirect(`/book/${isbn}`);
  },
  details({book, layout}, res, next){
    return book ? res.format({
      "text/html"() {
        res.render("book", {book, layout});
      },
      "application/json"(){
        res.json(book)
      },
      "default"() {

      }
    }) : next();
  },
  remove({isbn}, res, next){
    return res.status(204).end();
  }
}