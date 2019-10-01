const mapValues = require("lodash.mapvalues");

const wrapWithTryCatch1 = fn =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

function wrapWithTryCatch(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next)
    } catch (e) {
      next(e);
    }
  }
}

function withErrorHandling(api) {
  return mapValues(api, wrapWithTryCatch);
}

module.exports = ({bookRepository, bookService}) => (withErrorHandling({
  async createOrUpdate(req, res, next){
    const book = req.body;

    await bookService.createOrUpdate(book);

    return res.redirect(`/book/${book.isbn}`);
  },
  async details(req, res, next){
    const isbn = req.params.isbn;

    const book = await bookRepository.find({isbn});

    return book ? res.format({
      "text/html"() {
        res.send("HTML");
      },
      "application/json"(){
        res.json(book)
      },
      "default"() {

      }
    }) : next();
  },
  async remove(req, res, next){
    const isbn = req.params.isbn;

    await bookRepository.remove({isbn});

    return res.status(204).end();
  }
}));
