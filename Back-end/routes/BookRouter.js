const express = require("express");
const router = express.Router();

const bookCtr = require("../controllers/BookController");

router.get("/", bookCtr.getAllBook);
router.get("/:id", bookCtr.getOneBook);
router.get("/bestrating", bookCtr.getBestratingBook);
router.post("/", bookCtr.getBestratingBook);
router.put("/:id", bookCtr.createBook);
router.delete("/:id", bookCtr.deleteBook);
router.post("/:id/rating", bookCtr.ratingBook);

module.exports = router;
