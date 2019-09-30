const router = require('express').Router();
const {details, createOrUpdate} = require("./bookController");
const validateBookMiddleware = require("./validateBookMiddleware");

router.post("/book", validateBookMiddleware, createOrUpdate);
router.get("/book/:isbn", details);

module.exports = router;
