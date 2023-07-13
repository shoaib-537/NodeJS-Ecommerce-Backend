const { verifyToken } = require('../middleware/jwt')
const productController = require('../controllers/productController');
const express = require('express');

 
const router = express.Router();

// Create a new product
router.post('/product', verifyToken, productController.createProduct);

// Get all products
router.get('/product', productController.getAllProducts);

// Get a single product by ID
router.get('/product/:id', productController.getProductById);

// Update a product
router.put('/product/:id', productController.updateProduct);

// Delete a product
router.delete('/product/:id', verifyToken, productController.deleteProduct);

module.exports = router;
