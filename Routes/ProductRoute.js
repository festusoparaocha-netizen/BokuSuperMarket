const express = require('express');

//Import authentication middleware
const {protect} = require('../Middleware/auth');

//Import authorization middleware
const {authorize} = require('../Middleware/role');

const router = express.Router(); // Create a router instance

//Import product controller
const productController = require('../Controllers/ProductController');

// Define routes for product operations
// Route to create a new product
router.post('/createproducts', protect, authorize('superadmin'), productController.createProduct);

// Route to update an existing product
router.put('/updateproducts/:id', protect, authorize('storekeeper'), productController.updateProduct);

// Route to get a product by ID
router.get('/getproductbyid/:id', protect, productController.getProductById);

// Route to get all products
router.get('/getallproducts', protect, productController.getAllProducts);


//Export the router to be used in the main application
module.exports = router;