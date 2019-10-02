module.exports = {
  trackRequestTime(req, res, next){
    const start = Date.now();

    res.on('finish', () => {
      console.log(`Request time: ${Date.now() - start} ms`);
    });
    next();
  }
};
