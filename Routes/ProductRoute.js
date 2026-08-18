const express = require('express');
const router = express.Router(); // Create a router instance

//Import product controller
const productController = require('../Controllers/ProductController');


// Define routes for product operations
// Route to create a new product
router.post('/createproducts', productController.createProduct);

// Route to update an existing product
router.put('/updateproducts/:id', productController.updateProduct);

//Export the router to be used in the main application
module.exports = productrouter;