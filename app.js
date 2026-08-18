const express = require('express');
const app = express();
const productRoute = require('./Routes/ProductRoute'); // Import the product route 

app.use('/products', productRoute); // Use the product route

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});