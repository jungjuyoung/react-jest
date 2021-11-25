const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

// POST / api/products
router.post("/", productController.createProduct);
// GET / api/products
router.get("/", productController.getProduct);
// GET / api/productByID
router.get("/:productId", productController.getProductById);
//PUT /api/productByID
router.put("/:productId", productController.updateProduct);
module.exports = router;
