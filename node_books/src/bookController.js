const bookRepository = require("./bookRepository");
const bookService = require("./bookService");

module.exports = {
  async createOrUpdate(req, res, next){
    try{
      const {title, authors, isbn, description} = req.body;

      await bookService.createOrUpdate({title, authors, isbn, description});

      return res.redirect(`/book/${isbn}`);
    } catch (e) {
      next(e);
    }
  },
  async details(req, res, next){
    try{
      const isbn = req.params.isbn;

      const book = await bookRepository.find({isbn});

      return res.json(book);
    } catch (e) {
      next(e);
    }
  }
};
