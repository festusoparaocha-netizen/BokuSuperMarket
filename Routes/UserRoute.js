const express = require('express');
const router = express.Router(); // Create a router instance

//Import product controller
const userController = require('../Controllers/UserController');


// Define the routes
// Route to create a new user
router.post('/createusers', userController.createUser);

// Route to login a user
router.post('/loginuser', userController.loginUser);

//Export the router to be used in other files
module.exports = router;