const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

// POST /api/products
router.post("/", productController.createProduct);

module.exports = router;
