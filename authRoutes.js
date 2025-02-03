const express = require("express");
const router = express.Router();

const authController = require("../cntrollers/authControllers");

router.route("/register").post(authController.register);
router.route("/Login").post(authController.Login);


module.exports = router;

