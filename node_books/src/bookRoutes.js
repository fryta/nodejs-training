const router = require('express').Router();
const controller = require("./bookController");

router.post("/book", controller.createOrUpdate);
router.get("/book/:isbn", controller.details);

module.exports = router;
