const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig'); // Import the database connection function
const app = express();
const productRoute = require('./Routes/ProductRoute'); // Import the product route 

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to MongoDB database

app.use(express.json()); // Middleware to parse JSON request bodies


app.use('/products', productRoute); // Use the product route for all requests starting with /products

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});