const express = require("express");
const router = express.Router();

const bookCtr = require("../controllers/BookController");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.get("/", bookCtr.getAllBook);
router.get("/:id", bookCtr.getOneBook);
router.get("/bestrating", bookCtr.getBestratingBook);
router.post("/",auth, multer, bookCtr.createBook);
router.put("/:id",auth, multer, bookCtr.updateBook);
router.delete("/:id", bookCtr.deleteBook);
router.post("/:id/rating",auth, bookCtr.ratingBook);

module.exports = router;
