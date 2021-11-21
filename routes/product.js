const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

// GET /api/products
router.get("/", productController.createProduct);

module.exports = router;
