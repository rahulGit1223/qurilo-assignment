const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth")

// import controllers
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");
const adminAuth = require("../middleware/auth");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", adminAuth, logoutUser)


module.exports = router;
