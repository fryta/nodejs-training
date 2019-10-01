module.exports = ({bookRepository, bookService}) => ({
  async createOrUpdate(req, res, next){
    try{
      const book = req.body;

      await bookService.createOrUpdate(book);

      return res.redirect(`/book/${book.isbn}`);
    } catch (e) {
      next(e);
    }
  },
  async details(req, res, next){
    try{
      const isbn = req.params.isbn;

      const book = await bookRepository.find({isbn});

      return book ? res.json(book) : next();
    } catch (e) {
      next(e);
    }
  },
  async remove(req, res, next){
    try{
      const isbn = req.params.isbn;

      await bookRepository.remove({isbn});

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  }
});
