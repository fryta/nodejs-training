module.exports = {
  notFoundError(req, res, next){
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  },
  applicationError(err, req, res, next){
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
  }
};
