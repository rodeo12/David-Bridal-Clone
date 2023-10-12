const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Add more product-related routes (e.g., get a single product, update product details).


//Delete Product

router.delete("/:id",productController.deleteProduct)

//Update Product

router.put("/:_id",productController.updateProduct)
module.exports = router;
