const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file


const express = require('express');
const app = express();


const productRoute = require('./Routes/ProductRoute'); // Import the product route 
const userRoute = require('./Routes/UserRoute'); // Import the user route


app.use(express.json()); // Middleware to parse JSON request bodies


app.use('/products', productRoute); // Use the product route for all requests starting with /products
app.use('/users', userRoute); // Use the user route for all requests starting with /users


const connectDB = require('./Config/databaseConfig'); // Import the database connection function
connectDB(); // Connect to MongoDB database



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});