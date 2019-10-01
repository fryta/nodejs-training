const mapValues = require("lodash.mapvalues");
const responses = require("./responses");

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

    return responses.createOrUpdate({isbn: book.isbn}, res, next);
  },
  async details(req, res, next){
    const isbn = req.params.isbn;

    const layout = req.query.nolayout == null ? "layout" : "";

    const book = await bookRepository.find({isbn});

    return responses.details({book, layout}, res, next);
  },
  async remove(req, res, next){
    const isbn = req.params.isbn;

    await bookRepository.remove({isbn});

    return responses.remove({isbn}, res, next);
  }
}));
