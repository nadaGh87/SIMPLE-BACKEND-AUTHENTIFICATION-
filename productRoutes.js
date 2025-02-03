const express = require("express");
const router = express.Router();
const productController = require('../cntrollers/productController ');


router.route("/filter/:category").get(productController.filterByCategory);



module.exports= router;