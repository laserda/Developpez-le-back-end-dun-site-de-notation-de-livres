const express = require("express");
const router = express.Router();

const bookCtr = require("../controllers/BookController");
const multer = require("../middleware/multer-config");
const optimerImg = require("../middleware/optimizer-img-config");
const auth = require("../middleware/auth");




router.get("/", bookCtr.getAllBook);
router.get("/bestrating", bookCtr.getBestratingBook);
router.get("/:id", bookCtr.getOneBook);

router.post("/",auth, multer, optimerImg, bookCtr.createBook);
router.post("/:id/rating",auth, bookCtr.ratingBook);

router.put("/:id",auth, multer, optimerImg, bookCtr.updateBook);

router.delete("/:id",auth, bookCtr.deleteBook);

module.exports = router;
