const express = require("express");
const router = express.Router();

const userCtr = require("../controllers/UserController");

router.post("/signup", userCtr.signup);
router.post("/login", userCtr.login);

module.exports = router;
