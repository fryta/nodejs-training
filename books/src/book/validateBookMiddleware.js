const validateBook = require("./validateBook");

module.exports = function validate(req, res, next){
  const bookValidationErrors = validateBook(req.body);

  if(bookValidationErrors){
    const error = new Error();
    error.message = bookValidationErrors;
    error.status = 400;
    next(error);
  } else {
    next();
  }
};
