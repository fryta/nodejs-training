const router = require('express').Router();
const {details, createOrUpdate, remove} = require("./bookController");
const validateBookMiddleware = require("./validateBookMiddleware");

router.post("/book", validateBookMiddleware, createOrUpdate);
router.get("/book/:isbn", details);
router.delete("/book/:isbn", remove);

module.exports = router;
